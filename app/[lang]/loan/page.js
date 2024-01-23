"use client";
import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { Button, Grid, useMediaQuery } from "@mui/material";
import StepperComponentsHOC from "../components/StepperComponentsHOC.jsx";
import { useForm } from "react-hook-form";
import StepperNavigationButtons from "../components/StepperNavigationButtons.jsx";
import MobileStepper from "@mui/material/MobileStepper";
import { loanDetailsData } from "@public/loans";
import "@styles/styles.css";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import getDictionary from "@lib/dictionary";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loader from "../components/Loader.jsx";
import {
  handleNext,
  handleSetEMI,
  hanldeSubmitAttatchments,
} from "@utils/loanCalulation.js";
function LoanStepperPage({ params: { lang } }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/${lang}`);
    },
  });
  const {
    currentLoan,
    setCurrentLoan,
    changeLoanDetailsLocale,
    activeStep,
    setActiveStep,
    loans,
  } = useContext(CurrentLoanContext);
  const isMobile = useMediaQuery("(max-width:650px)");
  const [uploadProgress, setUploadProgress] = useState({
    started: false,
    pc: 0,
    finished: false,
    status: { errs: [] },
  });
  const {localePageContent}=useContext(CurrentLoanContext);
  console.log(localePageContent)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    // reValidateMode:'onChange',
    defaultValues: {
      ...currentLoan,
      currentSalary_Slider: currentLoan.currentSalary,
      currentSalary_Input: currentLoan.currentSalary,
    },
  });
  // useEffect(() => {
  //   const getPage = async () => {
  //     const page = await getDictionary(lang);
  //     setPageContent(page);
  //     changeLoanDetailsLocale(page.loansInformation);
  //   };
  //   getPage();
  // }, [currentLoan]);
  useEffect(() => {
    if (localStorage.getItem("currentLoan")) {
      const storedData = JSON.parse(localStorage.getItem("currentLoan"));
      setCurrentLoan(storedData);
    } else {
      if (currentLoan.isStaff) {
        setCurrentLoan((prev) => ({
          ...prev,
          ...session.userData.employeeData,
        }));

        localStorage.setItem(
          "currentLoan",
          JSON.stringify({ ...currentLoan, ...session?.userData?.employeeData })
        );
      }
    }

    // return localStorage.clear('currentLoan')
  }, []);

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    } else return;
  };

  const handleReset = () => {
    setCurrentLoan(loans[0]);
    setActiveStep(0);
  };
  return (
    <form noValidate onSubmit={handleSubmit((formData)=>handleNext(formData,activeStep,setCurrentLoan,setActiveStep,currentLoan))}>
      {localePageContent.loanInformation ? (
        <Grid
          container
          maxWidth={"100vw"}
          minHeight={"100vh"}
          justifyContent={isMobile ? "center" : "flex-start"}
          bgcolor={"background.default"}
          xs={12}
        >
          <Grid container minHeight={"20vh"} item xs={12} p={4} gap={2}>
            <Grid item xs={12}>
              <Typography
                sx={{ textAlign: { xs: "center", md: "start" } }}
                variant="h4"
              >
                {localePageContent.stepperTitle}
              </Typography>
            </Grid>
            <Grid container={isMobile ? true : false} item xs={12}>
              {isMobile ? (
                <Grid container gap={2} item xs={12}>
                  <Grid container justifyContent={"center"} item xs={12}>
                    <Typography variant="h6">
                      {localePageContent.stepperSteps[activeStep].slice(2)}
                    </Typography>
                  </Grid>
                  <Grid container item xs={12}>
                    <MobileStepper
                      variant="progress"
                      steps={localePageContent.stepperSteps.length}
                      position="static"
                      activeStep={activeStep}
                      classes={{ dotActive: "progress_active" }}
                      sx={{
                        width: "100%",
                        flexGrow: 1,
                        justifyContent: "center",
                        ".MuiMobileStepper-progress": {
                          width: "100%",
                          backgroundColor: "secondary.dark",
                        },
                      }}
                      style={{
                        backgroundColor: "#f0f0f0", // Set a background color for the progress bar
                      }}
                    />
                  </Grid>
                </Grid>
              ) : (
                <Stepper activeStep={activeStep}>
                  {localePageContent.stepperSteps.map((label, index) => {
                    return (
                      <Box
                        width={"100%"}
                        mr={"2px"}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={2}
                        key={label}
                      >
                        <Typography
                          variant="body1"
                          color={
                            activeStep == index
                              ? "secondary.dark"
                              : activeStep > index
                              ? "#215190"
                              : "darkgray"
                          }
                        >
                          {label}
                        </Typography>
                        <Box
                          width={"100%"}
                          height={"5px"}
                          backgroundColor={
                            activeStep == index
                              ? "secondary.dark"
                              : activeStep > index
                              ? "#215190"
                              : "darkgray"
                          }
                        ></Box>
                      </Box>
                    );
                  })}
                </Stepper>
              )}
            </Grid>
          </Grid>
          <Grid
            container
            item
            p={4}
            md={12}
            minHeight={"75vh"}
            gap={4}
            bgcolor={"#fff"}
          >
            <Grid container item md={12}>
              <StepperComponentsHOC
                register={register}
                errors={errors}
                uploadProstickygress={uploadProgress}
                setUploadProgress={setUploadProgress}
                lang={lang}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              backgroundColor: "#fff",
              transition: "all ease-in-out 1s",
              zIndex: "99",
            }}
            width={"100%"}
            p={4}
            mt={isMobile ? "100px" : "0"}
            maxHeight={"60px"}
            position={""}
            bottom={"0px"}
          >
            <Grid container item md={12}>
              <StepperNavigationButtons
                handleBack={handleBack}
                activeStep={activeStep}
                handleRest={handleReset}
                navigationContent={localePageContent.navigation}
              />
            </Grid>
          </Box>
        </Grid>
      ) : (
        <Grid container height={"calc(100vh - 200px)"}>
          <Loader />
        </Grid>
      )}
    </form>
  );
}

export default LoanStepperPage;

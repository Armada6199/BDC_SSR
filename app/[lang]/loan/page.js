"use client";
import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { Grid, useMediaQuery } from "@mui/material";
import StepperComponentsHOC from "../components/StepperComponentsHOC.jsx";
import { useFormContext } from "react-hook-form";
import StepperNavigationButtons from "../components/StepperNavigationButtons.jsx";
import MobileStepper from "@mui/material/MobileStepper";
import "@styles/styles.css";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import { useSession } from "next-auth/react";
import Loader from "../components/Loader.jsx";
import { handleNext } from "@utils/loanCalulation.js";
function LoanStepperPage({ params: { lang } }) {
  const { status } = useSession({});
  const {
    currentLoan,
    activeStep,
    setActiveStep,
    localePageContent,
    setLoanInfo,
  } = useContext(CurrentLoanContext);
  const isMobile = useMediaQuery("(max-width:650px)");
  const [uploadProgress, setUploadProgress] = useState({
    started: false,
    pc: 0,
    finished: false,
    status: { errs: [] },
  });
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    } else return;
  };
  const { handleSubmit } = useFormContext();

  if (status === "loading") {
    return (
      <Grid container height={"100vh"}>
        <Loader />
      </Grid>
    );
  }

  return (
    localePageContent && (
      <form
        noValidate
        onSubmit={handleSubmit((formData) =>
          handleNext(
            formData,
            activeStep,
            setLoanInfo,
            setActiveStep,
            currentLoan
          )
        )}
      >
        <Grid
          container
          justifyContent={isMobile ? "center" : "flex-start"}
          alignItems={"flex-start"}
          bgcolor={"background.default"}
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
            <Grid container={isMobile ? true : undefined} item xs={12}>
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
                uploadProgress={uploadProgress}
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
            position={"sticky"}
            bottom={"0px"}
          >
            <Grid container item md={12}>
              <StepperNavigationButtons
                handleBack={handleBack}
                activeStep={activeStep}
                navigationContent={localePageContent.navigation}
                lang={lang}
              />
            </Grid>
          </Box>
        </Grid>
      </form>
    )
  );
}

export default LoanStepperPage;

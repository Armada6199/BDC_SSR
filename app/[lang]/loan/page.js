'use client'
import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { Button, Grid, useMediaQuery } from "@mui/material";
import StepperComponentsHOC from "@components/StepperComponentsHOC.jsx";
import { useForm } from "react-hook-form";
import calculateEMI from "@utils/calculateEMI";
import StepperNavigationButtons from "@components/StepperNavigationButtons.jsx";
import MobileStepper from "@mui/material/MobileStepper";
import axios from "axios";
import { loanDetailsData } from "@public/loans";
import '@styles/styles.css'
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import  getDictionary  from "@lib/dictionary";
 function LoanStepperPage({params:{lang}}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [loans, setLoans] = React.useState(loanDetailsData);
  const {currentLoan,setCurrentLoan,changeLoanDetailsLocale}=useContext(CurrentLoanContext); 
  const isMobile = useMediaQuery("(max-width:650px)");
  const [pageContent,setPageContent]=useState('');
  const [uploadProgress, setUploadProgress] = useState({
    started: false,
    pc: 0,
    finished: false,
    status: { errs: [] },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
  useEffect(()=>{
    const getPage=async ()=>{
      const page= await getDictionary(lang);
      setPageContent(page);
      changeLoanDetailsLocale(page.loansInformation);
    }
    getPage();
  }
  ,[currentLoan]);
  async function hanldeSubmitAttatchments() {
    const formData = new FormData();
    for (let i = 0; i < currentLoan.loan_attatchments.length; i++) {
      formData.append("loan_attatchments", currentLoan.loan_attatchments[i]);
    }
    formData.append("employeeName", currentLoan.formData.employeeName);
    formData.append("employeeNumber", currentLoan.formData.employeeNumber);
    formData.append("fileNumber", currentLoan.formData.fileNumber);
    try {
      setUploadProgress((prev) => ({ ...prev, started: true }));
      const postAttatchments = await axios.post(
        `/api/attatchments`,
        formData,
        {
          onUploadProgress: (progressEvent) =>
            setUploadProgress((prev) => ({
              ...prev,
              pc: progressEvent.progress * 100,
            })),
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (postAttatchments.status === 200) {
        setUploadProgress((prev) => ({
          ...prev,
          started: false,
          finished: true,
          status: postAttatchments.data,
        }));
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  function handleSetEMI() {
    let { loanAmount, numberOfMonths, intrestRates, activeLoans } = currentLoan;
    loanAmount = Number(loanAmount);
    const { EMI, totalInterests, totalInterestLayers, activeLoansDeductions } =
      calculateEMI(
        loanAmount,
        intrestRates,
        numberOfMonths,
        currentLoan.title,
        activeLoans
      );
    setCurrentLoan((prev) => ({
      ...prev,
      loanAmount: loanAmount,
      numberOfMonths: numberOfMonths,
      EMI: EMI,
      interestPayable: totalInterests,
      payPerMonth: EMI / Number(numberOfMonths),
      totalAppliedLayers: totalInterestLayers,
      activeLoansDeductions: activeLoansDeductions,
    }));
  }
  const handleNext = async (formData) => {1
    if (activeStep == 0) {
      handleSetEMI();
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 3) {
      try {
        await hanldeSubmitAttatchments();
      } catch (error) {
        (error);
      }
    }
    if (activeStep !== pageContent.stepperSteps.length - 1 && activeStep !== 0) {
      setCurrentLoan((prev) => ({ ...prev, formData }));
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      ///submit data  here
      (currentLoan);
    }
  };

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
    <form noValidate onSubmit={handleSubmit(handleNext)}>
      {pageContent.loanInformation&&
      <Grid
        container
        item
        maxWidth={"100vw"}
        minHeight={"100vh"}
        justifyContent={isMobile ? "center" : "flex-start"}
        bgcolor={"background.default"}
        xs={12}
        sx={{direction:lang==="ar"?'rtl':'ltr'}}
      >
        <Grid container minHeight={"20vh"} item xs={12} p={4} gap={2}>
          <Grid item xs={12}>
            <Typography
              sx={{ textAlign: { xs: "center", md: "start" } }}
              variant="h4"
            >
              {pageContent.stepperTitle}
            </Typography>
          </Grid>
          <Grid container={isMobile ? true : false} item xs={12}>
            {isMobile ? (
              <Grid container gap={2} item xs={12}>
                <Grid container justifyContent={"center"} item xs={12}>
                  <Typography variant="h6">
                    {steps[activeStep].slice(2)}
                  </Typography>
                </Grid>
                <Grid container item xs={12}>
                  <MobileStepper
                    variant="progress"
                    steps={steps.length}
                    position="static"
                    activeStep={activeStep}
                    classes={{ dotActive: 'progress_active' }}
                    sx={{
                      width: "100%",
                      flexGrow: 1,
                      justifyContent: "center",
                      ".MuiMobileStepper-progress": {
                        width: "100%",
                        backgroundColor: "secondary.dark",
                      }
                    }}
                    style={{
                      backgroundColor: '#f0f0f0', // Set a background color for the progress bar
                    }}
                  />
                </Grid>
              </Grid>
            ) : (
              <Stepper activeStep={activeStep}>
                {pageContent.stepperSteps.map((label, index) => {
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
                            ? "#C4B28F"
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
                            ? "#C4B28F"
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
              loans={loans}
              activeStep={activeStep}
              register={register}
              errors={errors}
              setValue={setValue}
              handleSetEMI={handleSetEMI}
              hanldeSubmitAttatchments={hanldeSubmitAttatchments}
              uploadProgress={uploadProgress}
              setUploadProgress={setUploadProgress}
              pageContent={pageContent}
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
          mt={isMobile?"100px":'0'}
          maxHeight={'60px'}
          position={"sticky"}
          bottom={"0px"}
        >
          <Grid container item md={12}>
            <StepperNavigationButtons
              handleBack={handleBack}
              activeStep={activeStep}
              handleRest={handleReset}
              navigationContent={pageContent.navigation}
            />
          </Grid>
        </Box>
      </Grid>}
    </form>
  );
}

export default LoanStepperPage;

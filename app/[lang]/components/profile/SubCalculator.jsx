import React, { useContext, useEffect } from "react";
import AmountSlider from "../loansSlider/AmountSlider";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import { Button, Grid, Typography } from "@mui/material";
import MonthsSlider from "../loansSlider/MonthsSlider";
import SubCalculatorTypeNav from "./SubCalculatorTypeNav";
import { useForm } from "react-hook-form";
import {
  handleNext,
  handleSetDefaultLoanValues,
  handleSetEMI,
} from "@utils/loanCalulation";
import Link from "next/link";
import { glassmorphismStyle } from "@styles/styles";
import { useDebounce } from "@hooks/debounc";
import { useSession } from "next-auth/react";

function SubCalculator({ lang }) {
  const { data: session } = useSession();
  const {
    currentLoan,
    loanDetailsLocale,
    setCurrentLoan,
    localePageContent,
    setActiveStep,
    activeStep,
  } = useContext(CurrentLoanContext);
  const {
    register,
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
  useEffect(() => {
    handleSetDefaultLoanValues(currentLoan, setCurrentLoan);
  }, []);
  return (
    <Grid container sx={glassmorphismStyle} item xs={12} gap={4} p={4}>
      <Grid item xs={12}>
        <Typography variant="h4" fontWeight={"600"}>
          {localePageContent.profilePage.subCalculator.title}
        </Typography>
      </Grid>
      <Grid container item gap={2} xs={12}>
        <Grid item xs={12}>
          <Typography fontWeight={"600"} variant="h5">
            {localePageContent.profilePage.informationTabel.loanTypeLabel}
          </Typography>
        </Grid>
        <SubCalculatorTypeNav
          loansLocale={localePageContent.loansInformation}
        />
      </Grid>
      <Grid container item xs={12} gap={4} md={12}>
        <AmountSlider
          currentLoan={currentLoan}
          loanDetailsLocale={loanDetailsLocale}
          errors={errors}
          register={register}
          label={localePageContent.loanInformation.loanAmountLabel}
        />
        <MonthsSlider
          currentLoan={currentLoan}
          loanDetailsLocale={loanDetailsLocale}
          errors={errors}
          register={register}
          label={localePageContent.loanInformation.monthsLabel}
        />
        <Grid container justifyContent={"center"} item spacing={4} md={12}>
          <Grid item xs={12} textAlign={"center"} md={6}>
            <Typography variant="h6">
              {localePageContent.loanEligibility.charts.EMILabel}
            </Typography>
            <Typography variant="body1">
              {localePageContent.loanEligibility.charts.EMIExplainationLabel}
            </Typography>
            <Typography variant="h5">{currentLoan.EMI + " "} </Typography>
          </Grid>
          <Grid item xs={12} textAlign={"center"} md={6}>
            <Typography variant="h6">
              {localePageContent.loanEligibility.interestPayableLabel}
            </Typography>
            <Typography variant="h5">
              {currentLoan.interestPayable + " "}{" "}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4} item xs={12}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              sx={{ fontWeight: 600, fontSize: 16, color: "secondary.dark" }}
              onClick={() => handleSetEMI(currentLoan, setCurrentLoan)}
            >
              {localePageContent.profilePage.subCalculator.calculateButtonLabel}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Link href={`/${lang.lang}/loan`} onClick={() => setActiveStep(1)}>
              <Button
                fullWidth
                variant="contained"
                disabled={!currentLoan.EMI}
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  bgcolor: "secondary.dark",
                }}
              >
                {" "}
                {localePageContent.profilePage.subCalculator
                  .loanRedirectButton + " "}
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SubCalculator;

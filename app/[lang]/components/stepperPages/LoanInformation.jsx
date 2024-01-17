import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  FormHelperText,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import ActiveLoanForm from "../ActiveLoanForm";
import LoanDetails from "../LoanDetails";
import LoanTypes from "../LoanTypes";
import CurrentSalarySlider from "../loansSlider/CurrentSalarySlider";
import MonthsSlider from "../loansSlider/MonthsSlider";
import AmountSlider from "../loansSlider/AmountSlider";
import calculateEMI from "@utils/calculateEMI";
import "@styles/styles.css";
import LoanTypesSlider from "../mobile/MobileLoanTypes";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
function LoanInformation({
  loans,
  register,
  errors,
  setValue,
  loanInformationContent,
  localeLoans,
  lang,
}) {
  const { currentLoan, setCurrentLoan, loanDetailsLocale } =
    useContext(CurrentLoanContext);
  const handleSliderChange = (e) => {
    let { name, value } = e.target;
    setValue(name, value);
    name = name.split("_")[0];
    setCurrentLoan((prev) => ({ ...prev, [name]: value }));
    console.log(currentLoan);
  };

  const validateGreaterThanSalary = () => {
    let {
      loanAmount,
      numberOfMonths,
      intrestRates,
      activeLoans,
      currentSalary,
      maxMonths,
    } = currentLoan;
    if (numberOfMonths && loanAmount && currentSalary) {
      loanAmount = Number(loanAmount);

      let { isEligible } = calculateEMI(
        loanAmount,
        intrestRates,
        numberOfMonths,
        currentLoan.title,
        activeLoans,
        currentSalary
      );
      if (isEligible) {
        return true;
      } else {
        for (let i = numberOfMonths; i < maxMonths; i++) {
          let { isEligible } = calculateEMI(
            loanAmount,
            intrestRates,
            i,
            currentLoan.title,
            activeLoans,
            currentSalary
          );
          if (isEligible) {
            // (
            //   `found pay per month is ${i} and pay per month ${
            //     EMI / i
            //   } for loan amount of${EMI} and half of your salary is ${
            //     halfSalary
            //   }`
            // );
            return `Minimum Term For your request is ${i}`;
          }
        }
      }
      return "You Arent Eligiable for this Amount";
    }
  };
  function handleChangeCurrentLoan(title) {
    const targetLoan = loans.find((e) => e.title === title);
    setCurrentLoan((prev) => ({
      ...targetLoan,
      currentSalary: prev.currentSalary,
      isStaff: prev.isStaff,
      hasPrevLoan: prev.hasPrevLoan,
      activeLoans: prev.activeLoans,
      maxAmountAfterDeduction: prev.maxAmountAfterDeduction,
    }));
  }
  // useEffect(()=>{
  //   console.log(currentLoan)
  // },[])
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Grid
      container
      sx={{ height: "calc(100% + 200px)" }}
      alignItems={"flex-start"}
      spacing={10}
    >
      <Grid
        container
        alignItems={"center"}
        sx={{
          textAlign: { xs: "center", md: "left" },
        }}
        item
        sm={12}
        md={6}
        gap={4}
      >
        <Grid container item md={12} gap={4}>
          <Grid item xs={12} md={12}>
            <Typography
              textAlign={{ xs: "center", md: "start" }}
              variant="h5"
              fontWeight={"600"}
            >
              {loanInformationContent.applyTitle}
            </Typography>
          </Grid>
          <Grid container item justifyContent={"space-between"} md={10} lg={12}>
            {isMobile ? (
              <LoanTypesSlider
                currentLoan={currentLoan}
                setCurrentLoan={setCurrentLoan}
                localeLoans={localeLoans}
                handleChangeCurrentLoan={handleChangeCurrentLoan}
                viewDetailsButtonLabel={
                  loanInformationContent.viewDetailsButtonLabel
                }
              />
            ) : (
              <LoanTypes
                currentLoan={currentLoan}
                setCurrentLoan={setCurrentLoan}
                localeLoans={localeLoans}
                handleChangeCurrentLoan={handleChangeCurrentLoan}
              />
            )}
          </Grid>
        </Grid>
        <Grid container item sm={12} md={10} lg={12} spacing={4} gap={4}>
          <Grid container item sm={12}>
            <AmountSlider
              currentLoan={currentLoan}
              handleSliderChange={handleSliderChange}
              validateGreaterThanSalary={validateGreaterThanSalary}
              register={register}
              errors={errors}
              loanDetailsLocale={loanDetailsLocale}
              label={loanInformationContent.loanAmountLabel}
            />
          </Grid>
          <Grid container item>
            <MonthsSlider
              currentLoan={currentLoan}
              handleSliderChange={handleSliderChange}
              validateGreaterThanSalary={validateGreaterThanSalary}
              register={register}
              errors={errors}
              loanDetailsLocale={loanDetailsLocale}
              label={loanInformationContent.monthsLabel}
            />
          </Grid>
          <Grid container item>
            <CurrentSalarySlider
              currentLoan={currentLoan}
              handleSliderChange={handleSliderChange}
              validateGreaterThanSalary={validateGreaterThanSalary}
              register={register}
              errors={errors}
              loanDetailsLocale={loanDetailsLocale}
              label={loanInformationContent.salaryLabel}
            />
          </Grid>
        </Grid>
        <Grid container item md={10} lg={12}>
          <FormControl
            fullWidth
            disabled={currentLoan.isStaff}
            error={errors.isCurrentLoan?.message ? true : false}
          >
            <FormLabel
              sx={{ textAlign: "start" }}
              id="demo-radio-buttons-group-label"
            >
              {loanInformationContent.currentLoanLabel}{" "}
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={"no"}
              value={currentLoan.hasPrevLoan ? "yes" : "no"}
              name="currentLoan"
              row
              onChange={(e) => {
                e.target.value == "yes"
                  ? setCurrentLoan({
                      ...currentLoan,
                      hasPrevLoan: true,
                    })
                  : setCurrentLoan((prev) => ({
                      ...prev,
                      activeLoans: [
                        {
                          activeLoanLeftMonths: 0,
                          activeLoanLayer: 0,
                          activeLoanPayPerMonthInput: 0,
                          activeLoanType: 0,
                        },
                      ],
                      hasPrevLoan: false,
                    }));
              }}
            >
              <Grid item md={2}>
                <FormControlLabel
                  value={"yes"}
                  control={
                    <Radio
                      {...register("isCurrentLoan", {
                        required: currentLoan.isStaff
                          ? false
                          : "current Loan amount",
                      })}
                      sx={{
                        color: "#215190",
                        "&.Mui-checked": {
                          color: "secondary.dark",
                          transition: "all 0.3s ease",
                        },
                      }}
                    />
                  }
                  label={loanInformationContent.yesLabel}
                />
              </Grid>
              <Grid item md={2}>
                <FormControlLabel
                  value={"no"}
                  control={
                    <Radio
                      size="small"
                      {...register("isCurrentLoan", {
                        required: currentLoan.isStaff
                          ? false
                          : "current Loan amount",
                      })}
                      sx={{
                        color: "#215190",
                        "&.Mui-checked": {
                          color: "secondary.dark",
                        },
                      }}
                    />
                  }
                  label={loanInformationContent.noLabel}
                />
              </Grid>
            </RadioGroup>
            <FormHelperText>{errors.isCurrentLoan?.message}</FormHelperText>
          </FormControl>
        </Grid>
        {currentLoan.hasPrevLoan && (
          <Grid container item minHeight={"140px"} gap={6} md={12}>
            {currentLoan.activeLoans.map((activeLoan, index) => (
              <ActiveLoanForm
                key={index}
                index={index}
                activeLoan={activeLoan}
                register={register}
                currentLoan={currentLoan}
                setCurrentLoan={setCurrentLoan}
                activeFormLocale={loanInformationContent.activeLoans}
                lang
              />
            ))}
          </Grid>
        )}
      </Grid>
      {!isMobile && (
        <Grid container alignItems={"center"} item md={6}>
          <LoanDetails
            loanDetailsLocale={loanDetailsLocale}
            currentLoan={currentLoan}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default LoanInformation;

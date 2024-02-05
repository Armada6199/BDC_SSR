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
import "@styles/styles.css";
import LoanTypesSlider from "../mobile/MobileLoanTypes";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import {
  handleSetDefaultLoanValues,
  handleSliderChange,
} from "@utils/loanCalulation";
import { useSession } from "next-auth/react";
function LoanInformation({ register, errors }) {
  const { data: session } = useSession();
  const {
    currentLoan,
    setCurrentLoan,
    localePageContent: { loanInformation },
    loanDetailsLocale,
  } = useContext(CurrentLoanContext);
  useEffect(() => {
    handleSetDefaultLoanValues(currentLoan, setCurrentLoan);
  }, [session]);

  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Grid
      container
      sx={{ height: "calc(100% + 200px)" }}
      alignItems={"flex-start"}
      spacing={12}
    >
      <Grid
        container
        alignItems={"center"}
        sx={{
          textAlign: { xs: "center", md: "left" },
        }}
        item
        sm={12}
        md={7}
        gap={4}
      >
        <Grid container item md={12} gap={4}>
          <Grid item xs={12} md={12}>
            <Typography
              textAlign={{ xs: "center", md: "start" }}
              variant="h5"
              fontWeight={"600"}
            >
              {loanInformation.applyTitle}
            </Typography>
          </Grid>
          <Grid container item flexWrap={"nowrap"} gap={4} md={12}>
            {isMobile ? (
              <LoanTypesSlider
                currentLoan={currentLoan}
                setCurrentLoan={setCurrentLoan}
              />
            ) : (
              <LoanTypes
                currentLoan={currentLoan}
                setCurrentLoan={setCurrentLoan}
              />
            )}
          </Grid>
        </Grid>
        <Grid container item sm={12} md={10} lg={12} spacing={4} gap={4}>
          <Grid container item sm={12}>
            <AmountSlider
              currentLoan={currentLoan}
              register={register}
              errors={errors}
              loanDetailsLocale={loanDetailsLocale}
              label={loanInformation.loanAmountLabel}
            />
          </Grid>
          <Grid container item>
            <MonthsSlider
              currentLoan={currentLoan}
              register={register}
              errors={errors}
              loanDetailsLocale={loanDetailsLocale}
              label={loanInformation.monthsLabel}
            />
          </Grid>
          <Grid container item>
            <CurrentSalarySlider
              currentLoan={currentLoan}
              handleSliderChange={handleSliderChange}
              register={register}
              errors={errors}
              loanDetailsLocale={loanDetailsLocale}
              label={loanInformation.salaryLabel}
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
              {loanInformation.currentLoanLabel}{" "}
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
                        required: "current Loan amount",
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
                  label={loanInformation.yesLabel}
                />
              </Grid>
              <Grid item md={2}>
                <FormControlLabel
                  value={"no"}
                  control={
                    <Radio
                      size="small"
                      {...register("isCurrentLoan", {
                        required: "This filed Is Required",
                      })}
                      sx={{
                        color: "#215190",
                        "&.Mui-checked": {
                          color: "secondary.dark",
                        },
                      }}
                    />
                  }
                  label={loanInformation.noLabel}
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
                activeFormLocale={loanInformation.activeLoans}
                lang
              />
            ))}
          </Grid>
        )}
      </Grid>
      {!isMobile && (
        <Grid container alignItems={"center"} item md={5}>
          <LoanDetails currentLoan={currentLoan} />
        </Grid>
      )}
    </Grid>
  );
}

export default LoanInformation;

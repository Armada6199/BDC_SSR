import React, { useEffect } from "react";
import {
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  Slider,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { loanInfoInputStyle } from "@styles/styles.js";
function AmountSlider({
  register,
  currentLoan,
  handleSliderChange,
  errors,
  loanDetailsLocale,
  label,
}) {
  const maxAmount =
    currentLoan.maxAmountAfterDeduction || currentLoan.maxAmount;
  const isMobile = useMediaQuery("(max-width:600px)");
  console.log(maxAmount)
  const value = currentLoan.loanAmount ? currentLoan.loanAmount : maxAmount / 2;
  return (
    <FormControl
      fullWidth
      error={
        errors.loanAmount_Slider?.message && errors.loanAmount_Input?.message
          ? true
          : false
      }
    >
      <Grid container item md={12}>
        <Grid
          container
          flexDirection={isMobile ? "column" : "row"}
          gap={2}
          justifyContent={"space-between"}
          item
          md={12}
        >
          <Grid item md={6}>
            <Typography fontWeight={"600"} variant="h5">
              {label}
            </Typography>
          </Grid>
          <Grid item md={4}>
            <TextField
              sx={{ ...loanInfoInputStyle }}
              id="loanAmountInput"
              {...register("loanAmount_Input", {
                required: currentLoan.loanAmount
                  ? false
                  : "Kindly Choose loan amount",
                min: {
                  value: currentLoan.minAmount,
                  message: `Minimum Loan Amount is ${currentLoan.minAmount}`,
                },
                max: {
                  value: maxAmount,
                  message: `Maximum Loan Amount is ${maxAmount}`,
                },
              })}
              onChange={(e) => handleSliderChange(e)}
              type="number"
              inputProps={{
                min: currentLoan.minAmount,
                max: maxAmount,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon sx={{ color: "secondary.dark" }} />
                  </InputAdornment>
                ),
                sx: { fontWeight: 700 },
              }}
              variant="outlined"
              value={value}
            />
          </Grid>
          <Grid item md={12}>
            <Slider
              min={currentLoan.min}
              max={maxAmount}
              valueLabelDisplay="auto"
              color="secondary"
              size="medium"
              name="loanAmount"
              step={1000}
              {...register("loanAmount_Slider", {
                required: currentLoan.loanAmount
                  ? false
                  : "Kindly Choose loan amount",
                onChange: (e) => handleSliderChange(e),
              })}
              value={value}
            />
          </Grid>
          <Grid container item justifyContent={"space-between"}>
            <Grid item>
              <Typography
                variant="body1"
                fontWeight={"bold"}
                color={"darkgray"}
              >
                {loanDetailsLocale.minLoanAmountTitle}
              </Typography>
            </Grid>
            <Grid item md={5}>
              <FormHelperText sx={{ color: "red" }}>
                {" "}
                {errors.loanAmount_Input?.message}
              </FormHelperText>
            </Grid>
            <Grid item>
              <Typography
                variant="body1"
                fontWeight={"bold"}
                color={"darkgray"}
              >
                {maxAmount} JD
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default AmountSlider;

import React, { useContext } from "react";
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
import { loanInfoInputStyle } from "@styles/styles";
// import { useDebounce } from "../../hooks/debounce";
import {
  handleSliderChange,
  validateGreaterThanSalary,
} from "@utils/loanCalulation";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";

function MonthsSlider({ register, errors, currentLoan, label }) {
  const isMobile = useMediaQuery("(max-width:600px)");
  // const debouncedMonths=useDebounce(currentLoan.numberOfMonths_Input||currentLoan.numberOfMonths_Slider);
  const { setLoanInfo } = useContext(CurrentLoanContext);
  return (
    <FormControl
      fullWidth
      error={
        errors.numberOfMonths_Input?.message &&
        errors.numberOfMonths_Slider?.message
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
              sx={loanInfoInputStyle}
              id="numberOfMonthsInput"
              {...register("numberOfMonths_Input", {
                required: currentLoan.numberOfMonthst
                  ? false
                  : "Kindly Choose Number of Months",
                min: {
                  value: currentLoan.minMonths,
                  message: "Minimum Month Term is 12",
                },
                max: {
                  value: currentLoan.maxMonths,
                  message: `Maximum Month Term is ${currentLoan.maxMonths}`,
                },
                validate: (value) => validateGreaterThanSalary(currentLoan),
              })}
              onChange={(e) => handleSliderChange(e, setLoanInfo)}
              type="number"
              inputProps={{
                min: currentLoan.minAmount,
                max: currentLoan.maxMonths,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon sx={{ color: "secondary.dark" }} />
                  </InputAdornment>
                ),
                sx: { fontWeight: 700 },
              }}
              value={currentLoan.numberOfMonths}
              variant="outlined"
            />
          </Grid>
          <Grid item md={12}>
            <Slider
              min={currentLoan.minMonths}
              max={currentLoan.maxMonths}
              valueLabelDisplay="auto"
              color="secondary"
              size="medium"
              name="numberOfMonths"
              step={6}
              {...register("numberOfMonths_Slider", {
                required: currentLoan.loanAmount
                  ? false
                  : "Kindly Choose Number of Months",
                validate: (value) => validateGreaterThanSalary(currentLoan),
              })}
              onChange={(e) => handleSliderChange(e, setLoanInfo)}
              value={currentLoan.numberOfMonths}
            />
          </Grid>
          <Grid container item justifyContent={"space-between"}>
            <Grid item>
              <Typography
                variant="body1"
                fontWeight={"bold"}
                color={"darkgray"}
              >
                {currentLoan.minMonths}
              </Typography>
            </Grid>

            <Grid item md={5}>
              <FormHelperText sx={{ color: "red" }}>
                {" "}
                {errors.numberOfMonths_Input?.message}
              </FormHelperText>
            </Grid>
            <Grid item>
              <Typography
                variant="body1"
                fontWeight={"bold"}
                color={"darkgray"}
              >
                {currentLoan.maxMonths}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default MonthsSlider;

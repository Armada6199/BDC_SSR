import React from "react";
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

function CurrentSalarySlider({
  register,
  currentLoan,
  handleSliderChange,
  errors,
  loanDetailsLocale,
  label,
}) {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <FormControl
      fullWidth
      error={
        errors.currentSalary_Slider?.message &&
        errors.currentSalary_Input?.message
          ? true
          : false
      }
    >
      <Grid
        container
        flexDirection={isMobile ? "column" : "row"}
        gap={2}
        justifyContent={"space-between"}
        item
        md={12}
      >
        <Grid item md={6}>
          <Typography variant="h5" fontWeight={"600"}>
            {label}
          </Typography>
        </Grid>
        <Grid item md={4}>
          <TextField
            sx={loanInfoInputStyle}
            id="currentSalaryInput"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EditIcon sx={{ color: "secondary.dark" }} />
                </InputAdornment>
              ),
              sx: { fontWeight: 700 },
              value: currentLoan.currentSalary,
            }}
            {...register("currentSalary_Input", {
              onChange: (e) => handleSliderChange(e),
              required:
                currentLoan.currentSalary == 0
                  ? "Kindly Choose Salary amount"
                  : "Kindly Choose Salary amount",
              min: {
                value: 250,
                message: "Minimum Eligible Salary is 250 JD",
              },
            })}
            disabled={currentLoan.isStaff}
            type="number"
            step={50}
            inputProps={{
              min: 250,
              max: 10000,
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item md={12}>
          <Slider
            min={250}
            max={10000}
            valueLabelDisplay="auto"
            color="secondary"
            size="medium"
            name="currentSalary"
            step={50}
            {...register("currentSalary_Slider", {
              required:
                currentLoan.currentSalary === 0
                  ? "Kindly Choose Salary amount"
                  : "Kindly Choose Salary amount",
              onChange: (e) => handleSliderChange(e),
            })}
            disabled={currentLoan.isStaff}
            value={currentLoan.currentSalary}
              />
        </Grid>
        <Grid container item justifyContent={"space-between"}>
          <Grid item>
            <Typography variant="body1" fontWeight={"bold"} color={"darkgray"}>
              250 JD
            </Typography>
          </Grid>
          <Grid item md={5}>
            <FormHelperText sx={{ color: "red" }}>
              {" "}
              {errors.currentSalary_Input?.message ||
                errors.currentSalary_Slider?.message}
            </FormHelperText>
          </Grid>
          <Grid item>
            <Typography variant="body1" fontWeight={"bold"} color={"darkgray"}>
              100000 JD
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default CurrentSalarySlider;

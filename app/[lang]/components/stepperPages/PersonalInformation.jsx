import { Grid, TextField, Typography, useMediaQuery } from "@mui/material";
import React, { useContext } from "react";
import CustomDatePicker from "../CustomDatePicker";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";

function PersonalInformation({ register, errors, personalInformationContent }) {
  const isMobile = useMediaQuery("(max-width:650px)");
  const { currentLoan } = useContext(CurrentLoanContext);
  console.log(currentLoan);
  return (
    <Grid
      container
      justifyContent={{ xs: "center", md: "flex-start" }}
      item
      xs={12}
    >
      <Grid container item md={12}>
        <Grid item md={12}>
          <Typography variant="h5" fontWeight={"600"}>
            {personalInformationContent.sectionTitle}
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={12}
          justifyContent={isMobile ? "center" : ""}
          spacing={4}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="body1" fontWeight={"600"}>
              {personalInformationContent.employeeNameLabel}
            </Typography>
            <TextField
              fullWidth
              disabled={currentLoan.isStaff}
              error={!!errors.employeeName}
              helperText={errors.employeeName?.message}
              {...register("employeeName", {
                required: personalInformationContent.errors?.personalInfoInput,
                value:currentLoan.employeeName
              })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" fontWeight={"600"}>
              {personalInformationContent.fileNumberLabel}
            </Typography>
            <TextField
              fullWidth
              type="number"
              disabled={currentLoan.isStaff}
              error={!!errors.fileNumber}
              helperText={errors.fileNumber?.message}
              {...register("fileNumber", {
                required: personalInformationContent.errors?.personalInfoInput,
                value:currentLoan.fileNumber
              })}
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          md={12}
          justifyContent={isMobile ? "center" : ""}
          spacing={4}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="body1" fontWeight={"600"}>
              {personalInformationContent.jobTitleLabel}
            </Typography>
            <TextField
              fullWidth
              disabled={currentLoan.isStaff}
              error={!!errors.jobTitle}
              helperText={errors.jobTitle?.message}
              {...register("jobTitle", {
                required: personalInformationContent.errors?.personalInfoInput,
                value:currentLoan.jobTitle
              })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" fontWeight={"600"}>
              {personalInformationContent.joiningDateLabel}
            </Typography>
            <CustomDatePicker
              value={currentLoan.joiningDate}
              disabled={currentLoan.isStaff}
            />
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={12}
          md={12}
          justifyContent={isMobile ? "center" : ""}
          spacing={4}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="body1" fontWeight={"600"}>
              {personalInformationContent.employeeLevelLabel}
            </Typography>
            <TextField
              fullWidth
              disabled={currentLoan.isStaff}
              error={!!errors.employeeLevel}
              helperText={errors.employeeLevel?.message}
              {...register("employeeLevel", {
                required: personalInformationContent.errors.personalInfoInput,
                value:currentLoan.employeeLevel

              })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" fontWeight={"600"}>
              {personalInformationContent.jobLevelLabel}
            </Typography>
            <TextField
              fullWidth
              disabled={currentLoan.isStaff}
              error={!!errors.jobLevel}
              helperText={errors.jobLevel?.message}
              {...register("jobLevel", {
                required: personalInformationContent.errors.personalInfoInput,
                value:currentLoan.jobLevel

              })}
            />
          </Grid>
        </Grid>
        <Grid container xs={12} item md={12} spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" fontWeight={"600"}>
              {personalInformationContent.employeeNumberLabel}
            </Typography>
            <TextField
              fullWidth
              type="number"
              disabled={currentLoan.isStaff}
              error={!!errors.employeeNumber}
              helperText={errors.employeeNumber?.message}
              {...register("employeeNumber", {
                required: personalInformationContent.errors.personalInfoInput,
                value:currentLoan.employeeNumber

              })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid item xs={12}>
              <Typography variant="body1" fontWeight={"600"}>
                {personalInformationContent.workPlaceLabel}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                disabled={currentLoan.isStaff}
                error={!!errors.workPlace}
                helperText={errors.workPlace?.message}
                {...register("workPlace", {
                  required: personalInformationContent.errors.personalInfoInput,
                  value:currentLoan.workPlace
                })}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PersonalInformation;

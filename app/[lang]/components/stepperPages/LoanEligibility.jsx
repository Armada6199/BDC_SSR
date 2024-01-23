import { Box, Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect } from "react";
import InfoIcon from "@mui/icons-material/Info";
import CustomChart from "../charts/CustomChart";
import { glassmorphismStyle } from "@styles/styles.js";
import ElibiblityLayerTable from "../ElibiblityLayerTable";
import { CustomBarChat } from "../charts/CustomBarChat";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import { loanIcons } from "@public/icons";

function LoanEligibility({
  lang,
}) {
  const isMobile = useMediaQuery("(max-width:650px)");
  const { currentLoan, localePageContent:{loanEligibility,loanEligibilityTable},loanDetailsLocale } = useContext(CurrentLoanContext);

  return (
    <Grid
      container
      sx={{
        height: "calc(100% + 200px)",
        justifyContent: { xs: "center", md: "flex-start" },
      }}
      alignItems={"flex-start"}
      gap={4}
    >
      <Grid container item gap={4} md={7}>
        <Grid
          container
          item
          gap={1}
          sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
          alignItems={"center"}
        >
          <Typography variant="h4">
            {loanEligibility.applyTitle}
          </Typography>
          <InfoIcon
            sx={{ width: "31px", height: "41px", color: "secondary.dark" }}
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sx={{
            textAlign: { xs: "center", md: "left" },
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <Grid
            container
            sx={{ borderBottom: isMobile ? "1px solid lightgray" : "" }}
            p={{ xs: 2 }}
            direction={"column"}
            item
            xs={12}
            md={3}
          >
            <Typography variant="h6">
              {loanEligibility.everyMonthPayTitle}
            </Typography>
            <Typography variant="h4" fontWeight={"600"}>
              {parseFloat(currentLoan.payPerMonth.toFixed(3))}
            </Typography>
          </Grid>
          <Grid
            container
            sx={{ borderBottom: isMobile ? "1px solid lightgray" : "" }}
            p={{ xs: 2 }}
            alignItems={"center"}
            item
            xs={12}
            md={3}
          >
            <Grid item xs={12}>
              <Typography variant="h6">
                {loanEligibility.loanTypeLabel}
              </Typography>
            </Grid>
            <Grid
              container
              alignItems={"flex-end"}
              justifyContent={{ xs: "center", md: "flex-start" }}
              gap={2}
              item
              xs={12}
            >
         
              {loanIcons[currentLoan.title]}
              <Typography variant="h5" fontWeight={"600"}>
                {loanDetailsLocale.title}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ borderBottom: isMobile ? "1px solid lightgray" : "" }}
            p={{ xs: 2 }}
            justifyContent={"center"}
            item
            xs={12}
            md={3}
          >
            <Grid item xs={12}>
              <Typography variant="h6">
                {loanEligibility.loanAmountLabel}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" fontWeight={"600"}>
                {currentLoan.loanAmount}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            alignItems={"center"}
            justifyContent={"center"}
            p={{ xs: 2 }}
            gap={2}
            item
            md={3}
          >
            <Grid item md={12}>
              <Typography variant="h6">
                {loanEligibility.loanTermLabel}
              </Typography>
              <Typography variant="h5" fontWeight={"600"}>
                {currentLoan.numberOfMonths}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Box
          sx={{
            width: "100%",
            height: "1px",
            bgcolor: "lightgray",
          }}
        />

        <Grid
          container
          item
          gap={1}
          sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
          alignItems={"center"}
        >
          <Typography variant="h4">
            {loanEligibility.loanDetailsTitle}
          </Typography>
          <InfoIcon
            sx={{ width: "31px", height: "41px", color: "secondary.dark" }}
          />
        </Grid>

        <Grid container item gap={4}>
          <ElibiblityLayerTable
            loanEligibilityTable={loanEligibilityTable}
            currentLoan={currentLoan}
            loanDetailsLocale={loanDetailsLocale}
          />
        </Grid>
      </Grid>
      <Grid p={4} container item justifyContent={"flex-start"} md={4} gap={4}>
        <Grid
          container
          sx={glassmorphismStyle}
          justifyContent={"center"}
          alignItems={"center"}
          gap={4}
          item
          md={12}
          p={4}
        >
          <Grid container maxHeight={"300px"} item md={12}>
            <CustomChart
              interestPayable={currentLoan.interestPayable}
              loanAmount={currentLoan.loanAmount}
              originalLoanAmountLabel={
                loanEligibility.charts.originalLoanAmountLabel
              }
              interestPayableLabel={
                loanEligibility.charts.appliedInterestLabel
              }
            />
          </Grid>
          <Grid container justifyContent={"center"} item spacing={4} md={12}>
            <Grid item xs={12} textAlign={"center"} md={6}>
              <Typography variant="h6">
                {loanEligibility.charts.EMILabel}
              </Typography>
              <Typography variant="body1">
                {loanEligibility.charts.EMIExplainationLabel}
              </Typography>
              <Typography variant="h5">{currentLoan.EMI}</Typography>
            </Grid>
            <Grid item xs={12} textAlign={"center"} md={6}>
              <Typography variant="h6">
                {loanEligibility.interestPayableLabel}
              </Typography>
              <Typography variant="h5">
                {currentLoan.interestPayable}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          sx={glassmorphismStyle}
          justifyContent={"center"}
          alignItems={"center"}
          minHeight={{ xs: "250px", md: "45%" }}
          height={{ xs: "300px" }}
          gap={4}
          item
          md={12}
          p={4}
        >
          <CustomBarChat
            totalAppliedLayers={currentLoan.totalAppliedLayers}
            layersLocale={loanEligibilityTable.layers}
            totalAppliedLabel={loanEligibility.charts.totalAppliedLabel}
            appliedInterestLabel={
              loanEligibility.charts.appliedInterestLabel
            }
            //change this to calculate the highest layer max plus the total interst applied to the max layer
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LoanEligibility;

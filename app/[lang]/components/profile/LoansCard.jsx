"use client";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import { Box, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import LandscapeOutlinedIcon from "@mui/icons-material/LandscapeOutlined";
import { glassmorphismStyle, floatingIconContStyle } from "@styles/styles";
import "@styles/styles.css";
function LoansCard() {
  const { localePageContent } = useContext(CurrentLoanContext);
  const {
    profilePage: { myInformation, informationTabel },
  } = localePageContent;
  const mobileIcons = {
    "Personal Loan": (
      <Person2OutlinedIcon sx={{ fontSize: 36, color: "secondary.dark" }} />
    ),
    "Home Loan": (
      <HouseOutlinedIcon sx={{ fontSize: 36, color: "secondary.dark" }} />
    ),
    "Car Loan": (
      <DirectionsCarFilledOutlinedIcon
        sx={{ fontSize: 36, color: "secondary.dark" }}
      />
    ),
    "Land Loan": (
      <LandscapeOutlinedIcon sx={{ fontSize: 36, color: "secondary.dark" }} />
    ),
  };
  const data = [
    [
      localePageContent.loanEligibilityTable.loanTypes[1].localeContent,
      localePageContent.loanEligibilityTable.loanTypes[1].value,
      "42000",
      "24",
      "Approved",
    ],
    [
      localePageContent.loanEligibilityTable.loanTypes[3].localeContent,
      localePageContent.loanEligibilityTable.loanTypes[3].value,
      "2000",
      "12",
      "Processing",
    ],
    [
      localePageContent.loanEligibilityTable.loanTypes[2].localeContent,
      localePageContent.loanEligibilityTable.loanTypes[2].value,
      "2000",
      "12",
      "Rejected",
    ],
    [
      localePageContent.loanEligibilityTable.loanTypes[0].localeContent,
      localePageContent.loanEligibilityTable.loanTypes[0].value,
      "50000",
      "24",
      "Approved",
    ],
  ];
  return (
    <Grid container item xs={12} gap={8} pl={4}>
      <Grid>
        <Typography variant="h4" fontWeight={600}>
          {informationTabel.myLoansLabel}
        </Typography>
      </Grid>
      {data.map((loan, index) => {
        return (
          <Grid container item spacing={4} xs={12}>
            <Grid
              container
              item
              xs={12}
              p={4}
              height={"20%"}
              bgcolor={"secondary.dark"}
              sx={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
            >
              <Box sx={floatingIconContStyle}>
                <Box>{mobileIcons[loan[1]]}</Box>
              </Box>
            </Grid>
            <Grid
              container
              item
              p={4}
              xs={12}
              gap={4}
              sx={{
                ...glassmorphismStyle,
                borderTopRightRadius: "0",
                borderTopLeftRadius: "0",
              }}
            >
              <Grid item xs={12} mt={4}>
                <Typography variant="h5" fontWeight={600} textAlign={"center"}>
                  {loan[0]}
                </Typography>
              </Grid>
              <Grid container spacing={4} textAlign={"center"} item xs={12}>
                <Grid item xs={6}>
                  <Typography variant="h6" fontWeight={600}>
                    2400 {localePageContent.currencyLabel}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color={"darkgray"}
                  >
                    {informationTabel.loanAmountLabel}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" fontWeight={600}>
                    4
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color={"darkgray"}
                  >
                    {informationTabel.remainingMonthsLabel}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" fontWeight={600}>
                    220 {localePageContent.currencyLabel}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color={"darkgray"}
                  >
                    {informationTabel.monthlyPaymentLabel}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="h6"
                    sx={{
                      color:
                        loan[4] == "Approved"
                          ? "#25DB93"
                          : loan[4] === "Rejected"
                          ? "#FE6177"
                          : "#4253CD",
                      fontWeight: "600",
                    }}
                    fontWeight={600}
                  >
                    {informationTabel.statusButtons[loan[4]]}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color={"darkgray"}
                  >
                    {informationTabel.loanStatusLabel}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default LoansCard;

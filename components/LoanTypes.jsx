import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import {
  loansIconStyle,
  loanIconContStyle,
  loanTypesBoxesStyle,
} from "@styles/styles.js";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import LandscapeOutlinedIcon from "@mui/icons-material/LandscapeOutlined";
const loanIcons=[<Person2OutlinedIcon/>,<HouseOutlinedIcon/>,<DirectionsCarFilledOutlinedIcon/>,<LandscapeOutlinedIcon/>]

function LoanTypes({
  localeLoans,
  currentLoan,
  handleChangeCurrentLoan,
}) {
  return (
    <>
      {localeLoans.map((loan,index) => (
        <Grid
          container
          sx={{
            ...loanTypesBoxesStyle,
            backgroundColor:
              currentLoan.title === loan.enTitle ? "#E8E8E8" : "#fff",
            cursor: "pointer",
          }}
          item
          md={6}
          lg={2}
          key={loan.title}
          onClick={() => handleChangeCurrentLoan(loan.enTitle||loan.title)}
        >
          <Grid container justifyContent={"center"} item md={12}>
            <Box sx={loanIconContStyle}>{loanIcons[index]}</Box>
          </Grid>
          <Grid container justifyContent={"center"} item md={12}>
            <Typography variant="body1" fontWeight={"bold"}>
              {loan.title}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </>
  );
}

export default LoanTypes;

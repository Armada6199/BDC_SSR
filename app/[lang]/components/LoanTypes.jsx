import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import {
  loansIconStyle,
  loanIconContStyle,
  loanTypesBoxesStyle,
} from "@styles/styles.js";
import { loanIcons } from "@public/icons";


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
              currentLoan.title === loan.title||currentLoan.title === loan.enTitle ? "#E8E8E8" : "#fff",
            cursor: "pointer",
            justifyContent:'center',
            alignItems:"center"
          }}
          item
          md={6}
          lg={2}
          key={loan.title}
          onClick={() => handleChangeCurrentLoan(loan.enTitle||loan.title)}
        >
          <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'} gap={1} item>
          <Box sx={{...loanIconContStyle,bgcolor:'secondary.dark',color:"#FFF"}}>{loanIcons[loan.enTitle||loan.title]}</Box>
          <Typography variant="body1" textAlign={'center'} fontWeight={"bold"}>
              {loan.title}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </>
  );
}

export default LoanTypes;

import { Box, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import {
  loansIconStyle,
  loanIconContStyle,
  loanTypesBoxesStyle,
} from "@styles/styles.js";
import { loanIcons } from "@public/icons";
import { handleChangeCurrentLoan } from "@utils/loanCalulation";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";


function LoanTypes({
  currentLoan,
}) {
  const {loans,setCurrentLoan,localePageContent:{loansInformation}}=useContext(CurrentLoanContext)
  return (
    <>
      {loansInformation.map((loan,index) => (
        <Grid
          container
          sx={{
            ...loanTypesBoxesStyle,
            backgroundColor:
              currentLoan.title === loan.title||currentLoan.title === loan.enTitle ? "#E8E8E8" : "#fff",
            cursor: "pointer",
          }}
          item
          md={4}
          xl={3}
          justifyContent={'center'}
          alignItems={'center'}
          key={loan.title}
          onClick={() => handleChangeCurrentLoan(loan.enTitle||loan.title,setCurrentLoan,loans)}
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

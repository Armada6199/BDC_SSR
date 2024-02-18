import { Box, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { loanIcons } from "@public/icons";
import { loanDetailsData as loans } from "@public/loans";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import { handleChangeCurrentLoan } from "@utils/loanCalulation";
function SubCalculatorTypeNav({ loansLocale }) {
  const { currentLoan, setLoanInfo } = useContext(CurrentLoanContext);

  return (
    <Grid container item xs={12}>
      {loansLocale.map((loanLocale) => (
        <Grid item xs={3}>
          <Box
            onClick={() =>
              handleChangeCurrentLoan(
                loanLocale.enTitle || loanLocale.title,
                setLoanInfo,
                currentLoan
              )
            }
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              p: 2,
              borderRadius: "50%",
              height: "30px",
              width: "30px",
              color: "secondary.dark",
              cursor: "pointer",
              color:
                currentLoan.title === loanLocale.title ||
                currentLoan.title === loanLocale.enTitle
                  ? "secondary.dark"
                  : "primary.main",
            }}
          >
            {loanIcons[loanLocale.enTitle || loanLocale.title]}
            <Typography fontWeight={"600"}>
              {loanLocale.title.split(" ")[1]}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default SubCalculatorTypeNav;

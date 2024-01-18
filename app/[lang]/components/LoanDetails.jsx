import { Grid, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { glassmorphismStyle } from "@styles/styles.js";
import TermsTable from "./TermsTable";
import ClearIcon from "@mui/icons-material/Clear";
function LoanDetails({  handleClose,loanDetailsLocale }) {
  const isMobile=useMediaQuery('(max-width:600px)');
  return (
    <Grid container item p={4} height={'100%'} overflow={'scroll'} gap={4} sx={glassmorphismStyle}>
      {isMobile && (
        <ClearIcon
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: 32,
          }}
        />
      )}
      <Grid item md={12}>
        <Typography variant="h6" fontWeight={"bold"} color={"secondary.dark"}>
          {loanDetailsLocale.title}
        </Typography>
      </Grid>
      <Grid item md={12}>
        <Typography variant="body1" fontWeight={"500"}>
        {loanDetailsLocale.description}
        </Typography>
      </Grid>
      <Grid item md={12}>
          <Typography variant="h6" fontWeight={"bold"} color={"secondary.dark"}>
          {loanDetailsLocale.privilegesTitle}
        </Typography>
      </Grid>
      <Grid container item gap={2}>
        {loanDetailsLocale.privileges.map((priv) => (
          <Grid item md={12} lg={5} key={priv}>
            <Box key={priv} display={"flex"} gap={1}>
              <CheckCircleIcon color="secondary" />
              <Typography>{priv}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid item md={12}>
        <Typography variant="h6" fontWeight={"bold"} color={"secondary.dark"}>
          {loanDetailsLocale.termsTitle}
        </Typography>
      </Grid>
      <Grid container item>
        <TermsTable loanDetailsLocale={loanDetailsLocale} />
      </Grid>
    </Grid>
  );
}

export default LoanDetails;

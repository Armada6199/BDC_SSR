import { Grid, Typography } from "@mui/material";
import { glassmorphismStyle } from "@styles/styles";
import React from "react";

function LoanInfoCards() {
  return (
    <Grid
      container
      xs={12}
      md={12}
      item
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Grid
        container
        item
        xs={12}
        md={4}
        height={"200px"}
        alignItems={"center"}
        p={4}
        sx={{
          ...glassmorphismStyle,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" fontWeight={700}>
            3500
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" color={"darkgray"} fontWeight={700}>
            Salary
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        md={4}
        height={"200px"}
        alignItems={"center"}
        p={4}
        sx={{
          ...glassmorphismStyle,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" fontWeight={700}>
            42000
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" color={"darkgray"} fontWeight={700}>
            Total Loans Amount
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        md={4}
        height={"200px"}
        alignItems={"center"}
        p={4}
        sx={{
          ...glassmorphismStyle,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" fontWeight={700}>
            42000
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" color={"darkgray"} fontWeight={700}>
            Total Loans Amount
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LoanInfoCards;

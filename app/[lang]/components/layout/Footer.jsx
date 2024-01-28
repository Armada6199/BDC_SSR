import { Grid, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Grid
      container
      bgcolor={"#424242"}
      borderTop={"4px solid #F05030"}
      justifyContent={"center"}
      p={0}
      alignItems={"center"}
      position={"static"}
      bottom={0}
      height={"60px"}
      item
      md={12}
    >
      <Typography variant="h6" color={"white"}>
        Copyright © 2022 Banque du Caire. All rights reserved
      </Typography>
    </Grid>
  );
}

export default Footer;

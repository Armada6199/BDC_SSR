import { Button, Grid, Typography } from "@mui/material";
import { glassmorphismStyle } from "@styles/styles";
import Image from "next/image";
import React from "react";
import profileImg from "@public/assets/profile.jpg";
import InfoIcon from "@mui/icons-material/Info";

function MyInformation({ myInformationLocale }) {
  return (
    <Grid container item xs={12} gap={4}  p={4} sx={glassmorphismStyle}>
      <Grid container gap={1} alignItems={"center"} item xs={12}>
        <Grid item>
          <Typography variant="h4" fontWeight={600}>
            {myInformationLocale.myLoansLabel}
          </Typography>
        </Grid>
        <Grid item>
          <InfoIcon
            sx={{ width: "31px", height: "41px", color: "secondary.dark" }}
          />
        </Grid>
      </Grid>
      <Grid container item spacing={8} xs={12}>
        <Grid item xs={12} md={3}>
          <Image
            src={profileImg}
            width={82}
            height={82}
            style={{ borderRadius: "50%" }}
          />
        </Grid>
        <Grid container item xs={3}  md={9}>
          <Grid item xs={12}>
            <Typography variant="body1" fontWeight={600}>
              Mohamad Abdin
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" fontWeight={"600"} color={"darkgray"}>
              Software Developer
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" fontWeight={'700'} sx={{color:'secondary.dark'}}>Amman</Typography>
        </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={4} item xs={12}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight={500}>
            3500 JD
          </Typography>
          <Typography variant="body2" fontWeight={600} color={"darkgray"}>
            Salary After Deductions
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight={500}>
            4
          </Typography>
          <Typography variant="body2" fontWeight={600} color={"darkgray"}>
            Active Loans
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight={500}>
            2
          </Typography>
          <Typography variant="body2" fontWeight={600} color={"darkgray"}>
            Previous Loans
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight={500}>232</Typography>
          <Typography variant="body2" fontWeight={600} color={"darkgray"}>
            Employee Number
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MyInformation;

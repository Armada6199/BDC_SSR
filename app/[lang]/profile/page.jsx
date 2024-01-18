"use client";
import React, { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import InfoIcon from "@mui/icons-material/Info";
import Loader from "../components/Loader";
import { glassmorphismStyle } from "@styles/styles";

function Profile({ params: lang }) {
  const { data:session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/${lang}`);
    },
  });
  const { localePageContent } = useContext(CurrentLoanContext);
  console.log(session)
  return (
    localePageContent&&session?.userData?.employeeData?
    <Grid container item xs={12} sx={{ height: { sm: "100%" } }}>
        <Grid container item p={4} spa gap={4}>
        <Grid
          container
          item
          gap={1}
          sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
          alignItems={"center"}
        >
          <Typography variant="h4">
            {localePageContent.profilePage.myLoansLabel}
          </Typography>
          <InfoIcon
            sx={{ width: "31px", height: "41px", color: "secondary.dark" }}
          />
        </Grid>
        <Grid container item xs={12} bgcolor={'#4f4f4f'}>

        </Grid>
        <Grid container  item xs={12}   >
            <Grid container item xs={12} md={4} height={'150px'} p={4} sx={glassmorphismStyle} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={12} textAlign={'center'}>
                    <Typography variant="h5" fontWeight={'600'} color={'secondary.dark'}>MY SALARY</Typography>
                </Grid>
                <Grid item xs={12} textAlign={'center'}>
                    <Typography variant="h4" fontWeight={'500'}>3500 دينار</Typography>
                </Grid>
            </Grid>
            <Grid container item x={12} md={4} height={'150px'} p={4} sx={glassmorphismStyle} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={12} textAlign={'center'}>
                    <Typography variant="h5" fontWeight={'600'} color={'secondary.dark'}>Active Loans</Typography>
                </Grid>
                <Grid item xs={12} textAlign={'center'}>
                    <Typography variant="h4" fontWeight={'500'}>3</Typography>
                </Grid>
            </Grid>
            <Grid container item x={12} md={4} height={'150px'} p={4} sx={glassmorphismStyle} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={12} textAlign={'center'}>
                    <Typography variant="h5" fontWeight={'600'} color={'secondary.dark'}> Previous Loans Deductions</Typography>
                </Grid>
                <Grid item xs={12} textAlign={'center'}>
                    <Typography variant="h4" fontWeight={'500'}>3</Typography>
                </Grid>
            </Grid>
        </Grid>
        </Grid>
    </Grid>:
    <Grid container sx={{height:'calc(100vh - 200px)'}}>
    <Loader/>
    </Grid>
  );
}

export default Profile;

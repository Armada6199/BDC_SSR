"use client";
import React, { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import Loader from "../components/Loader";
import MyInformation from "../components/profile/MyInformation";
import LoanInfoCards from "../components/profile/LoanInfoCards";
import LoansTable from "../components/profile/LoansTable";
import { glassmorphismStyle } from "@styles/styles";

function Profile({ params: lang }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/${lang}`);
    },
  });
  const { localePageContent } = useContext(CurrentLoanContext);
  return localePageContent && session?.userData?.employeeData ? (
    <Grid container p={4} bgcolor={'background.default'} xs={12} >
      <Grid container item  xs={12}  md={12} spacing={8} >
        <Grid container item xs={12} md={3}>
          <MyInformation
            myInformationLocale={localePageContent.profilePage.myInformation}
          />
        </Grid>
        <Grid container gap={8} item xs={12} md={9}>
        <Grid container item xs={12} md={12}>
          <LoanInfoCards />
        </Grid>
        <Grid container item xs={12} p={4} sx={glassmorphismStyle} md={12}>
          <LoansTable />
        </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <Grid container sx={{ height: "calc(100vh - 200px)" }}>
      <Loader />
    </Grid>
  );
}

export default Profile;
{
  /* <Grid container item p={4} spa gap={4}>
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
</Grid> */
}

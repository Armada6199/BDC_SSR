"use client";
import React, { useContext, useEffect } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { useSession } from "next-auth/react";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import MyInformation from "../components/profile/MyInformation";
import LoanInfoCards from "../components/profile/LoanInfoCards";
import LoansTable from "../components/profile/LoansTable";
import SubCalculator from "../components/profile/SubCalculator";
import Loader from "../components/Loader";
import LoansCard from "../components/profile/LoansCard";

function Profile({ params: lang }) {
  const { data: session, status } = useSession({
    // required: true,
  });
  const isGuest =
    session?.userData?.employeeData?.isGuest || !session ? true : false;
  const isMobile = useMediaQuery("(max-width:600px)");
  const {setActiveStep}=useContext(CurrentLoanContext);

  if (status === "loading")
    return (
      <Grid container sx={{ height: "calc(100vh - 120px)" }}>
        <Loader />
      </Grid>
    );
  else if (status == "unauthenticated" || isGuest) {
    return (
      <Grid container sx={{ height: "calc(100vh - 120px)" }}>
        <Loader />
      </Grid>
    );
  }

  const { localePageContent } = useContext(CurrentLoanContext);
  const {
    profilePage: { myInformation, informationCards, informationTabel },
  } = localePageContent;
  return (
    !isGuest &&
    session && (
      <Grid container bgcolor={"background.default"} p={4}>
        <Grid
          container
          item
          xs={12}
          gap={4}
          alignItems={"flex-start"}
          sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}
        >
          <Grid container item xs={12} md={4} xl={3}>
            <MyInformation session={session} myInformation={myInformation} />
          </Grid>
          <Grid container item xs={12} gap={{ xs: 8, sm: 4 }} md={8} xl={9}>
            <Grid container item xs={12}>
              <LoanInfoCards
                session={session}
                informationCards={informationCards}
              />
            </Grid>
            <Grid
              container
              sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}
              gap={4}
              item
              xs={12}
            >
              <Grid item xs={12} md={7}>
                {isMobile ? (
                  <LoansCard />
                ) : (
                  <LoansTable informationTabel={informationTabel} />
                )}
              </Grid>
              <Grid item md={5}>
                <SubCalculator lang={lang} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  );
}

export default Profile;

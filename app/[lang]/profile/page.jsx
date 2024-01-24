"use client";
import React, { useContext, useEffect } from "react";
import { Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import MyInformation from "../components/profile/MyInformation";
import LoanInfoCards from "../components/profile/LoanInfoCards";
import LoansTable from "../components/profile/LoansTable";
import SubCalculator from "../components/profile/SubCalculator";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";

function Profile({ params: lang }) {
  const { push } = useRouter();
  const { data: session, status } = useSession({
    required: true,
  });
  const isGuest =
    session?.userData?.employeeData?.isGuest || !session ? true : false;
  if (status === "loading")
    return (
      <Grid container xs={12} sx={{ height: "calc(100vh - 120px)" }}>
        <Loader />
      </Grid>
    );
  else if (status == "unauthenticated" || isGuest) {
    return (
      <Grid container xs={12} sx={{ height: "calc(100vh - 120px)" }}>
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
          alignItems={"flex-start"}
          wrap="nowrap"
          md={12}
        >
          <Grid container pr={4} item xs={12} md={4} xl={3}>
            <MyInformation myInformation={myInformation} />
          </Grid>
          <Grid container item xs={12} gap={4} md={8} xl={9}>
            <Grid container item xs={12}>
              <LoanInfoCards informationCards={informationCards} />
            </Grid>
            <Grid container wrap="nowrap" gap={4} item xs={12}>
              <LoansTable informationTabel={informationTabel} />
              <SubCalculator lang={lang} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  );
}

export default Profile;

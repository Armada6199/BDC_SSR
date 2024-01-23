"use client";
import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import Loader from "../components/Loader";
import MyInformation from "../components/profile/MyInformation";
import LoanInfoCards from "../components/profile/LoanInfoCards";
import LoansTable from "../components/profile/LoansTable";
import LoginModal from "../components/LoginModal";
import SubCalculator from "../components/profile/SubCalculator";

function Profile({ params: lang }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // setShowLoginModal(true);
      //   redirect(`/${lang.lang}`);
    },
  });

  useEffect(() => {
    // if (session?.userData?.employeeData?.isGuest) setShowLoginModal(true);
  }, []);
  const {
    localePageContent: {
      profilePage: { myInformation, informationCards, informationTabel },
    },
    currentLoan,
  } = useContext(CurrentLoanContext);
  return true ? (
    <Grid container bgcolor={"background.default"} p={4}>
      <Grid
        container
        item
        xs={12}
        alignItems={"flex-start"}
        spacing={8}
        md={12}
      >
        <Grid container p={4} item xs={12} md={4} xl={3}>
          <MyInformation myInformation={myInformation} />
        </Grid>
        <Grid container item xs={12} gap={8} md={8} xl={9}>
          <Grid container item xs={12}>
            <LoanInfoCards informationCards={informationCards} />
          </Grid>
          <Grid container wrap="nowrap" gap={8} item xs={12}>
            <LoansTable informationTabel={informationTabel} />
            <SubCalculator lang={lang} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : showLoginModal ? (
    <LoginModal
      //   setLoginCredindtials={setLoginCredindtials}
      //   handleStaffLogin={handleStaffLogin}
      //   handleCloseStaffLogin={handleCloseStaffLogin}
      localePageContent={localePageContent}
      lang={lang}
      //   isLoginingIn={isLoginingIn}
    />
  ) : (
    <Grid container sx={{ height: "calc(100vh - 200px)" }}>
      <Loader />
    </Grid>
  );
}

export default Profile;

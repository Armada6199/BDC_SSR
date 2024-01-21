"use client";
import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import Loader from "../components/Loader";
import MyInformation from "../components/profile/MyInformation";
import LoanInfoCards from "../components/profile/LoanInfoCards";
import LoansTable from "../components/profile/LoansTable";
import LoginModal from "../components/LoginModal";

function Profile({ params: lang }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      setShowLoginModal(true);
      //   redirect(`/${lang.lang}`);
    },
  });
  console.log(session,lang,showLoginModal)
  useEffect(()=>{
    if( session?.userData?.employeeData?.isGuest) setShowLoginModal(true)
  },[])
  const { localePageContent, currentLoan } = useContext(CurrentLoanContext);
  return localePageContent &&
    session?.userData?.employeeData &&!
    session.userData.employeeData.isGuest ? (
    <Grid container bgcolor={"background.default"} p={4}>
      <Grid
        container
        item
        xs={12}
        p={4}
        alignItems={"flex-start"}
        spacing={4}
        md={12}
      >
        <Grid container p={4} item xs={12} md={4} xl={3}>
          <MyInformation
            myInformationLocale={localePageContent.profilePage.myInformation}
          />
        </Grid>

        <Grid container item xs={12} gap={8} md={8} xl={9}>
          <LoanInfoCards
            informationCardsLocale={
              localePageContent.profilePage.informationCards
            }
          />
          <LoansTable
            informationTabelLocale={
              localePageContent.profilePage.informationTabel
            }
          />
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

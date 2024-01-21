"use client";
import React, { useContext, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
// import bankLogo from "next/assets/Banque_du_caire_Logowhite.svg";
import { redirect, usePathname, useRouter } from "next/navigation";
import bankWhite from "@public/assets/Banque_du_caire_Logowhite.svg";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
function Header({ lang }) {
  const pathName = usePathname();
  const { push } = useRouter();
  const { localePageContent } = useContext(CurrentLoanContext);
  const isProfileActive=pathName===`/${lang}/profile`;
  const isLoanApplyActive=pathName===`/${lang}/loan`;
  const redirectedPathName = (locale) => {  
    if (!pathName) redirect("/");
    const segments = pathName.split("/");
    segments[1] = locale;
    push(segments.join("/") )
  };

  return (
    localePageContent && (
      <Grid
        container
        bgcolor={"#424242"}
        height={"100px"}
        borderBottom={"4px solid #F05030"}
        alignItems={"center"}
        item
        px={4}
        xs={12}
      >
        <Grid container spacing={4} wrap="nowrap" gap={{xs:8}}  alignItems={"center"} item xs={10}>
          <Grid
            item
            sx={{ cursor: "pointer" }}
            component={Link}
            href={`/${lang}`}
            xs={4}
            md={2}
          >
            <Image src={bankWhite} alt="bankLogo" width="152" height="60" />
          </Grid>
          <Grid
            item
            component={isProfileActive?'':Link}
            style={{textDecoration:'none'}}
            href={`/${lang}/profile`}
            xs={8}
            md={1}
            sx={{ cursor:isProfileActive?'':"pointer"}}  
          >
            <Typography variant="h6" sx={{color:isProfileActive?'secondary.dark':'#fff' }}>
              {localePageContent.heading.headerMyLoansLabel}
            </Typography>
          </Grid>
          <Grid
            item
            component={isLoanApplyActive?'':Link}
            style={{textDecoration:'none'}}
            href={`/${lang}/loan`}
            xs={8}
            md={2}      
            sx={{ cursor:isLoanApplyActive?'':"pointer"}}  
          >
            <Typography variant="h6" sx={{color:isLoanApplyActive?'secondary.dark':'#fff' }}>
              {localePageContent.heading.applyLoanPageLabel}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{ cursor: "pointer" }}
          onClick={() => redirectedPathName(lang == "en" ? "ar" : "en")}
        >
          <Typography variant="h6" textAlign={"end"} color={"white"}>
            {localePageContent.switchLanguageLabel}
          </Typography>
        </Grid>
      </Grid>
    )
  );
}

export default Header;

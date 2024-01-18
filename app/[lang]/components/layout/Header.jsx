"use client";
import React, { useContext, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import Image from "next/image";
// import bankLogo from "next/assets/Banque_du_caire_Logowhite.svg";
import { usePathname, useRouter } from "next/navigation";
import bankWhite from "@public/assets/Banque_du_caire_Logowhite.svg";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
function Header({ lang }) {
  const pathName = usePathname();
  const { push } = useRouter();
  const { localePageContent } = useContext(CurrentLoanContext);
  const redirectedPathName = (locale, extPath = "") => {
    if (!pathName) push("/");
    const segments = pathName.split("/");
    console.log(locale);
    segments[1] = locale;
     push(segments.join("/") + extPath);
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
        <Grid
          container
          spacing={4}
          alignItems={"center"}
          item
          xs={10}
        >
          <Grid item xs={2} md={4}>
            <Image src={bankWhite} alt="bankLogo" width="152" height="60" />
          </Grid>
          <Grid
            item
            onClick={() => redirectedPathName(lang, "/profile")}
            xs={10}
            md={8}
            sx={{ cursor: "pointer" }}
          >
            <Typography variant="h6" color={"white"}>
              {localePageContent.heading.headerMyLoansLabel}
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

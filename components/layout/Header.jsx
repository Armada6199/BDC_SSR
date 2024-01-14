"use client";
import React, { useContext, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
// import bankLogo from "next/assets/Banque_du_caire_Logowhite.svg";
import Image from "next/image";
import { LanguageContext } from "@hooks/LanguageProvider";
import { usePathname, useRouter } from "next/navigation";

function Header({lang}) {
  const pathName=usePathname();
  const {push}=useRouter();
 const redirectedPathName=(locale)=>{
  if(!pathName)  push('/');
  const segments=pathName.split('/');
  segments[1]=locale;
  push(segments.join('/'))
 };

  return (
    <Grid
      container
      bgcolor={"#424242"}
      height={"100px"}
      borderBottom={"4px solid #F05030"}
      p={0}
      justifyContent={"space-between"}
      px={4}
      alignItems={"center"}
      item
      md={12}
    >
      <Grid item md={6}>
        {/* <Box
          component={"img"}
          height={"60px"}
          sx={{ fill: "white" }}
          src={bankLogo}
        /> */}
        {/* <img src={bankLogo} alt="Bank Logo" height={"60px"} /> */}
        <Image
          src={"/assets/Banque_du_caire_Logowhite.svg"}
          alt="bankLogo"
          width="152"
          height="60"
        />
      </Grid>
      <Grid
        item
        md={6}
        sx={{ cursor: "pointer" }}
        onClick={() => redirectedPathName(lang=='en'?'ar':'en')}
      >
        <Typography variant="h6" textAlign={"end"} color={"white"}>
          {lang=='en'?'AR':'EN'}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Header;

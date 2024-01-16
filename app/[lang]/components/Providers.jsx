"use client";
import CurrentLoanProvider from "@hooks/CurrentLoanProvider";
import LoginContextProvider from "@hooks/LoginProvider";
import TranslationWrapper from "@utils/ThemeRegistry";
import React from "react";
function Providers({children,lang }) {
  return (
    <CurrentLoanProvider>
      <TranslationWrapper dir={lang=='ar'?'rtl':'ltr'} >
      <LoginContextProvider>{children}</LoginContextProvider>
      </TranslationWrapper>
    </CurrentLoanProvider>  
  );
} 

export default Providers;

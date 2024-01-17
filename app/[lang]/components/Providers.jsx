"use client";
import AuthProvider from "@hooks/AuthProvider";
import CurrentLoanProvider from "@hooks/CurrentLoanProvider";
import LoginContextProvider from "@hooks/LoginProvider";
import TranslationWrapper from "@utils/ThemeRegistry";
import React from "react";
function Providers({children,lang }) {
  return (
    <AuthProvider>
    <CurrentLoanProvider>
      <TranslationWrapper dir={lang=='ar'?'rtl':'ltr'} >
      <LoginContextProvider>{children}</LoginContextProvider>
      </TranslationWrapper>
    </CurrentLoanProvider>  
    </AuthProvider>

  );
} 

export default Providers;

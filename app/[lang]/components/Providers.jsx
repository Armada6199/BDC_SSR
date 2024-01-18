"use client";
import AuthProvider from "@hooks/AuthProvider";
import CurrentLoanProvider from "@hooks/CurrentLoanProvider";
import TranslationWrapper from "@utils/ThemeRegistry";
import React from "react";
function Providers({ children, lang }) {
  return (
    <AuthProvider>
      <TranslationWrapper dir={lang == "ar" ? "rtl" : "ltr"}>
        <CurrentLoanProvider lang={lang}>
         {children}
        </CurrentLoanProvider>
      </TranslationWrapper>
    </AuthProvider>
  );
}

export default Providers;

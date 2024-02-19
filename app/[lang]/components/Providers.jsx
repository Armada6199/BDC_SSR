"use client";
import AuthProvider from "@hooks/AuthProvider";
import CurrentLoanProvider from "@hooks/CurrentLoanProvider";
import TranslationWrapper from "@utils/ThemeRegistry";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
function Providers({ children, lang }) {
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  return (
    <FormProvider {...methods}>
      <AuthProvider>
        <TranslationWrapper dir={lang == "ar" ? "rtl" : "ltr"}>
          <CurrentLoanProvider lang={lang}>{children}</CurrentLoanProvider>
        </TranslationWrapper>
      </AuthProvider>
    </FormProvider>
  );
}

export default Providers;

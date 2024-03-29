"use client";
import React, { createContext, useEffect, useState } from "react";
import { loanDetailsData } from "@public/loans";
import getDictionary from "@lib/dictionary";
export const CurrentLoanContext = createContext();
const CurrentLoanProvider = ({ children, lang }) => {
  const [currentLoan, setCurrentLoan] = useState(loanDetailsData[1]);
  const [loanDetailsLocale, setLoanDetailsLocale] = useState("");
  const [localePageContent, setLocalePageContent] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [loans, setLoans] = useState(loanDetailsData);
  function changeLoanDetailsLocale(loans) {
    setLoanDetailsLocale(
      loans.filter(
        (e) => e.enTitle === currentLoan.title || e.title === currentLoan.title
      )[0]
    );
  }

  function setLoanInfo(data) {
    setCurrentLoan((prev) => ({
      ...prev,
      ...data,
    }));
    const localData = JSON.parse(localStorage.getItem("currentLoan"));
    localStorage.setItem(
      "currentLoan",
      JSON.stringify({ ...localData, ...data })
    );
  }
  useEffect(() => {
    if (localStorage.getItem("currentLoan")) {
      setCurrentLoan(JSON.parse(localStorage.getItem("currentLoan")));
    } else {
      localStorage.setItem("currentLoan", JSON.stringify({ ...currentLoan }));
    }
  }, []);

  useEffect(() => {
    const getPage = async () => {
      const localizedPagesContent = await getDictionary(lang);
      setLocalePageContent(localizedPagesContent);
      setLoanDetailsLocale(localizedPagesContent.loansInformation[1]);
    };
    getPage();
  }, [lang]);
  return (
    <CurrentLoanContext.Provider
      value={{
        currentLoan,
        changeLoanDetailsLocale,
        loanDetailsLocale,
        localePageContent,
        activeStep,
        setActiveStep,
        loans,
        setLoanInfo,
      }}
    >
      {children}
    </CurrentLoanContext.Provider>
  );
};
export default CurrentLoanProvider;

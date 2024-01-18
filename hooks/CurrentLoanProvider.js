"use client";
import React, { createContext, useEffect, useState } from "react";
import { loanDetailsData } from "@public/loans";
import getDictionary from "@lib/dictionary";
export const CurrentLoanContext = createContext();
const CurrentLoanProvider = ({ children,lang }) => {
  const [currentLoan, setCurrentLoan] = useState(loanDetailsData[1]);
  const [loanDetailsLocale, setLoanDetailsLocale] = useState("");
  const [userType,setUserType]=useState('staff');
  const [localePageContent,setLocalePageContent]=useState('')
  function changeLoanDetailsLocale(loans) {
    setLoanDetailsLocale(
      loans.filter((e) => e.enTitle === currentLoan.title|| e.title === currentLoan.title)[0]
    );
  }
  function changeDirection(lang) {
    setDirection(lang === "en" ? "ltr" : "rtl");
  };
  useEffect(() => {
    const getPage = async () => {
      const pageContent = await getDictionary(lang);
      setLocalePageContent(pageContent);
    };
    getPage();
  }, [lang]);
  return (
    <CurrentLoanContext.Provider
      value={{
        currentLoan,
        setCurrentLoan,
        changeLoanDetailsLocale,
        loanDetailsLocale,
        userType,
        setUserType,
        localePageContent,
        setLocalePageContent
      }}
    >
      {children}
    </CurrentLoanContext.Provider>
  );
};
export default CurrentLoanProvider;

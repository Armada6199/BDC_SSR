"use client";
import React, { createContext, useEffect, useState } from "react";
import { loanDetailsData } from "@public/loans";
export const CurrentLoanContext = createContext();
const CurrentLoanProvider = ({ children }) => {
  const [currentLoan, setCurrentLoan] = useState(loanDetailsData[1]);
  const [loanDetailsLocale, setLoanDetailsLocale] = useState("");
  const [direction, setDirection] = useState("ltr");
  function changeLoanDetailsLocale(loans) {
    setLoanDetailsLocale(
      loans.filter((e) => e.enTitle === currentLoan.title|| e.title === currentLoan.title)[0]
    );
  }
  function changeDirection(lang) {
    console.log(lang)
    setDirection(lang === "en" ? "ltr" : "rtl");
  };

  return (
    <CurrentLoanContext.Provider
      value={{
        currentLoan,
        setCurrentLoan,
        changeLoanDetailsLocale,
        loanDetailsLocale,
        changeDirection,
      }}
    >
      {children}
    </CurrentLoanContext.Provider>
  );
};
export default CurrentLoanProvider;

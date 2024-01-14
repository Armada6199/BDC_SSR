"use client";
import React, { createContext,  useState } from "react";
import { loanDetailsData } from "@public/loans";

export const CurrentLoanContext = createContext();
const CurrentLoanProvider = ({children}) => {
  const [currentLoan, setCurrentLoan] = useState(loanDetailsData[1]);
  return (
    <CurrentLoanContext.Provider value={{ currentLoan, setCurrentLoan }}>
        {children}
    </CurrentLoanContext.Provider>
  );
};
export default CurrentLoanProvider;

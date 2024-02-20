"use client";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect } from "react";

function LoanLayout({ children }) {
  const { data: session, status } = useSession();
  const { setLoanInfo } = useContext(CurrentLoanContext);

  useEffect(() => {
    if (session) setLoanInfo(session);
  }, [status]);
  return <Box>{children}</Box>;
}

export default LoanLayout;

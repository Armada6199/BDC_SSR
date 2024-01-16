'use client'
import { Box } from '@mui/material'
import React from 'react'

function LoanLayout({children,params:{lang}}) {
    // const {currentLanguage}=useContext(LanguageContext);
  return (
    <Box >
        {children}
    </Box>
    )
}

export default LoanLayout
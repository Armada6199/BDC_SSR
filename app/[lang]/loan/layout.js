'use client'
import { LanguageContext } from '@hooks/LanguageProvider';
import { Box } from '@mui/material'
import React, { useContext } from 'react'

function LoanLayout({children}) {
    const {currentLanguage}=useContext(LanguageContext);
    const currentDirection=currentLanguage==='en'?'ltr':'rtl';
  return (
    <Box sx={{direction:currentDirection}}>
        {children}
    </Box>
    )
}

export default LoanLayout
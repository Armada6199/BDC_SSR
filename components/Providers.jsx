import CurrentLoanProvider from '@hooks/CurrentLoanProvider'
import LanguageContextProvider from '@hooks/LanguageProvider'
import LoginContextProvider from '@hooks/LoginProvider'
import ThemeRegistry from '@utils/ThemeRegistry'
import React from 'react'

function Providers({ children }) {
  return (
    <CurrentLoanProvider>
      <LanguageContextProvider>
    <LoginContextProvider>
    <ThemeRegistry options={{ key: "mui-theme" }}>
      {children}
  </ThemeRegistry>
  </LoginContextProvider>
  </LanguageContextProvider>
  </CurrentLoanProvider>
  )
}

export default Providers
import CurrentLoanProvider from '@hooks/CurrentLoanProvider'
import LoginContextProvider from '@hooks/LoginProvider'
import ThemeRegistry from '@utils/ThemeRegistry'
import React from 'react'

function Providers({ children }) {
  return (
    <CurrentLoanProvider>
    <LoginContextProvider>
    <ThemeRegistry options={{ key: "mui-theme" }}>
    {children}
  </ThemeRegistry>
  </LoginContextProvider>
  </CurrentLoanProvider>
  )
}

export default Providers

import Providers from "@components/Providers";
import "./globals.css";
import CurrentLoanProvider from "@hooks/CurrentLoanProvider";
// export const metadata = {
//   title: "BDC SSR",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Providers>
          {children}
      </Providers>
      </body>
    </html>
  );
}

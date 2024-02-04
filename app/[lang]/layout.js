import Providers from "./components/Providers";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { i18n } from "@i18n.config";
import ResponsiveHeader from "./components/layout/ResponsiveHeader";
import { Box, Grid } from "@mui/material";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
export default function RootLayout({ children, params: { lang } }) {
  return (
    <html dir={lang === "en" ? "ltr" : "rtl"} lang={lang}>
      <head>
        <meta name="BDC" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,100;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <Providers lang={lang}>
        <body dir={lang == "en" ? "ltr" : "rtl"}>
          <ResponsiveHeader lang={lang} />
          {children}
          <Footer lang={lang} />
        </body>
      </Providers>
    </html>
  );
}

import Providers from "./components/Providers";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { i18n } from "@i18n.config";
import Head from "next/head";
// export const metadata = {
//   title: "BDC SSR",
// };
export async function generateStaticParams(){
  return i18n.locales.map(locale=>({lang:locale}));
};
export default function RootLayout({ children,params:{lang} }) {
  // useEffect(() => {
  //   document.body.dir = lang==='ar'?'rtl':'ltr';
  // }, [i18n]);
    return (
    <html dir={lang==='en'?'ltr':"rtl"} lang={lang}>
      <head>
      <meta name="BDC"/>
          <link
            rel="stylesheet"
            href="https://fonts.google.com/share?selection.family=DM+Sans:ital,opsz,wght@0,9..40,100;0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;1,9..40,300;1,9..40,500|Noto+Sans+Arabic:wght@200;300;400;500;600;700|Poppins:ital,wght@0,100;0,300;0,500;0,700;0,800;0,900;1,600"
          />
      </head>
      <body >
        <Providers lang={lang}>
      <Header lang={lang}/>
          {children}
          <Footer lang={lang}/>
    </Providers>
      </body>
    </html>
  );
}

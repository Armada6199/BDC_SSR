
import Providers from "@components/Providers";
import "./globals.css";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
// export const metadata = {
//   title: "BDC SSR",
// };
import { i18n } from "@i18n.config.js";
export async function generateStaticParams(){
  return i18n.locales.map(locale=>({lang:locale}));
};
export default function RootLayout({ children,params:{lang} }) {
  return (
    <html lang={lang}>
      <body>
        <Providers>
      <Header lang={lang}/>
          {children}
          <Footer lang={lang}/>
          </Providers>

      </body>
    </html>
  );
}

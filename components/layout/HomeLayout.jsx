import { Grid } from "@mui/material";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";

export const metadata = {
  title: "BDC SSR",
};

export default function HomeLayout({ children }) {
  return (
<>
  <Header/>
  {children}
  <Footer/>
</>
  );
}

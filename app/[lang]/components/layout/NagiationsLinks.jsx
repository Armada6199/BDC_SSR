"use client";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SavingsIcon from "@mui/icons-material/Savings";
import { usePathname, useRouter } from "next/navigation";
import { Grid, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import bankWhite from "@public/assets/Banque_du_caire_Logowhite.svg";
import Image from "next/image";
import { Home } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
const NagiationsLinks = ({ localePageContent, lang, mobileOpen = false }) => {
  const pathName = usePathname();
  const { push } = useRouter();
  const { data: session } = useSession();
  const { currentLoan } = useContext(CurrentLoanContext);
  const navIcons = [
    <Home sx={{ fontSize: 24 }} />,
    <AccountCircleIcon sx={{ fontSize: 24 }} />,
    <SavingsIcon sx={{ fontSize: 24 }} />,
  ];
  return (
    <Grid
      container
      item
      alignItems={"center"}
      p={{ xs: 2 }}
      gap={{ xs: 4, sm: 0 }}
      xs={12}
    >
      <Grid item xs={12} md={2} xl={2}>
        <Image src={bankWhite} alt="bankLogo" width="152" height="60" />
      </Grid>
      <Grid container item xs={12} gap={{ xs: 4, sm: 4 }} md={6} xl={4}>
        {localePageContent.heading.navigation.map(
          (nav, index) =>
            (("nav.link == /profile" && session) ||
              (nav.link == "/loan" && (session || currentLoan.isClient))) && (
              <Grid
                borderBottom={{ xs: "1px solid darkgray", sm: "none" }}
                sx={{ width: { xs: "100%", sm: "fit-content" } }}
                item
                key={index}
              >
                <Link
                  href={`/${lang}` + nav.link}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    width: "100%",
                  }}
                >
                  <Grid
                    container
                    item
                    xs={12}
                    md={12}
                    alignItems={"center"}
                    sx={{
                      color:
                        pathName === `/${lang}` + nav.link
                          ? "secondary.dark"
                          : "#fff",
                    }}
                  >
                    <Grid item xs={2} display={{ xs: "grid", sm: "none" }}>
                      {navIcons[index]}
                    </Grid>
                    <Grid item>
                      <Typography textAlign={"start"} variant="h6">
                        {nav.localeContent}
                      </Typography>
                    </Grid>
                  </Grid>
                </Link>
              </Grid>
            )
        )}
      </Grid>
      <Grid
        container
        alignItems={"center"}
        gap={1}
        sx={{ color: "#fff", cursor: "pointer" }}
        item
        xs={12}
        md={2}
        onClick={() => {
          signOut({ callbackUrl: `/${lang}` });
        }}
        display={{ xs: !session ? "inherit" : "none", md: "none" }}
        borderBottom={{ xs: "1px solid darkgray", sm: "none" }}
      >
        <Grid item>
          <LogoutIcon sx={{ fontSize: 24 }} />
        </Grid>
        <Grid item>
          <Typography variant="h6">
            {" "}
            {localePageContent.heading.logoutLabel}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default NagiationsLinks;

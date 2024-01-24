'use client'
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
import LanguageIcon from "@mui/icons-material/Language";
import { redirectedPathName } from "@utils/loanCalulation";
const NagiationsLinks = ({ localePageContent, lang, mobileOpen = false }) => {
  const pathName = usePathname();
  const { push } = useRouter();
  const { data: session } = useSession();
  const navIcons = [
    <Home sx={{ fontSize: 24 }} />,
    <AccountCircleIcon sx={{ fontSize: 24 }} />,
    <SavingsIcon sx={{ fontSize: 24 }} />,
  ];
  const isGuest = session?.userData?.employeeData?.isGuest ? true : false;
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
      <Grid container item xs={12} gap={{ xs: 4, sm: 0 }} md={6} xl={3}>
        {localePageContent.heading.navigation.map(
          (nav, index) =>
            (nav.link !== "/profile" || (!isGuest && session)) && (
              <Grid
                container
                borderBottom={{ xs: "1px solid darkgray", sm: "none" }}
                item
                xs={12}
                md={4}
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
                    <Grid item xs={10}>
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
          signOut({ callbackUrl: `http://localhost:3000/${lang}` });
        }}
        display={{ xs: !isGuest ? "inherit" : "none", md: "none" }}
        borderBottom={{ xs: "1px solid darkgray", sm: "none" }}
      >
        <Grid item display={{ xs: "block", sm: "none" }}>
          <LogoutIcon sx={{ fontSize: 24 }} />
        </Grid>
        <Grid item>
          <Typography variant="h6">
            {" "}
            {localePageContent.heading.logoutLabel}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        md={3}
        xl={7}
        justifyContent={"flex-end"}
        textAlign={"end"}
        display={{ xs: "none", md: "inherit" }}
      >
        <Grid
          item
          component={Link}
          href={redirectedPathName(lang == "ar" ? "en" : "ar")}
          md={2}
          sx={{ cursor: "pointer", color: "#fff", textDecoration: "none" }}
        >
          <Typography variant="h6">
            {localePageContent.switchLanguageLabel}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{ color: "#fff", cursor: "pointer" }}
          onClick={() => {
            signOut({ callbackUrl: `http://localhost:3000/${lang}` });
          }}
          display={{
            xs: "none",
            md: !isGuest && session ? "grid" : "none",
          }}
          md={2}
        >
          <Typography variant="h6">
            {localePageContent.heading.logoutLabel}
          </Typography>
        </Grid>
      </Grid>
      <Box position={"fixed"} bottom={0}>
        <Grid
          container
          item
          color={"#fff"}
          xs={12}
          md={2}
          display={{ xs: "grid", sm: "none" }}
        >
          <Grid container justifyContent={"center"} item>
            <Grid container gap={1} alignItems={"center"} item xs={4}>
              <Grid item>
                <LanguageIcon sx={{ fontSize: 24 }} />
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  {" "}
                  {localePageContent.heading.changeLanguageLabel}
                </Typography>
              </Grid>
            </Grid>
            <Grid container xs={12} alignItems={"center"} color={"#fff"} item>
              <Grid
                item
                component={Link}
                href={redirectedPathName(lang == "ar" ? "en" : "ar")}
                xs={6}
              >
                {" "}
                <Button
                  fullWidth
                  sx={{
                    fontSize: 16,
                    color: lang === "en" ? "secondary.dark" : "#fff",
                  }}
                >
                  EN
                </Button>
              </Grid>
              <Grid
                component={Link}
                href={redirectedPathName(lang == "ar" ? "en" : "ar")}
                item
                xs={6}
              >
                <Button
                  fullWidth
                  sx={{
                    fontSize: 16,
                    color: lang === "ar" ? "secondary.dark" : "#fff",
                  }}
                >
                  AR
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};
export default NagiationsLinks;

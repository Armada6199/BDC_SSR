import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SavingsIcon from "@mui/icons-material/Savings";
import { usePathname, useRouter } from "next/navigation";
import { Grid, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import bankWhite from "@public/assets/Banque_du_caire_Logowhite.svg";
import Image from "next/image";
import { Home } from "@mui/icons-material";
import { signOut } from "next-auth/react";
import LanguageIcon from "@mui/icons-material/Language";
const NagiationsLinks = ({ localePageContent, lang, mobileOpen = false }) => {
  const pathName = usePathname();
  // const isProfileActive = pathName === `/${lang}/profile`;
  // const isLoanApplyActive = pathName === `/${lang}/loan`;
  // const isHomeActive = pathName === `/${lang}`;
  const navIcons = [
    <Home sx={{ fontSize: 24 }} />,
    <AccountCircleIcon sx={{ fontSize: 24 }} />,
    <SavingsIcon sx={{ fontSize: 24 }} />,
  ];
  return (
    <Grid container p={2} gap={4} item xs={12}>
      <Grid
        item
        sx={{ cursor: "pointer" }}
        component={Link}
        href={`/${lang}`}
        xs={12}
      >
        <Image src={bankWhite} alt="bankLogo" width="152" height="60" />
      </Grid>
      <Grid container item gap={4}>
        {localePageContent.heading.navigation.map((nav, index) => (
          <Link
            href={`/${lang}` + nav.link}
            style={{ textDecoration: "none", width: "100%" }}
          >
            <Grid
              container
              alignItems={"flex-end"}
              gap={1}
              sx={{
                color:
                  pathName === `/${lang}` + nav.link
                    ? "secondary.dark"
                    : "#fff",
                cursor: "pointer",
              }}
              item
              xs={12}
              md={4}
            >
              {mobileOpen && (
                <Grid item xs={2}>
                  {navIcons[index]}
                </Grid>
              )}
              <Grid item>
                <Typography variant="h6">{nav.localeContent}</Typography>
              </Grid>
            </Grid>
            <Box width={"100%"} height={"1px"} bgcolor={"darkgray"} />
          </Link>
        ))}
      </Grid>
      <Grid container item color={"#fff"} xs={12}>
        <Grid container alignItems={"flex-end"} gap={1} item>
          <Grid item>
            <LanguageIcon sx={{ fontSize: 24 }} />
          </Grid>
          <Grid item>
            <Typography variant="h6">اللغة</Typography>
          </Grid>
        </Grid>

        <Grid container color={'#fff'} item>
          <Grid item xs={6}>
            {" "}
            <Button fullWidth>EN</Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth>AR</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems={"flex-end"}
        gap={1}
        sx={{ color: "#fff" }}
        item
        xs={12}
        onClick={() => {
          signOut();
        }}
      >
        <Grid item>
          <LogoutIcon sx={{ fontSize: 24 }} />
        </Grid>
        <Grid item>
          <Typography variant="h6">تسجيل الخروج</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default NagiationsLinks;
//   <Grid
//   container
//   item
//   gap={{ xs: 4, md: 2 }}
//   justifyContent={{ xs: "center", md: "flex-start" }}
//   xs={12}
//   height={"100%"}
// >
//   <Grid container alignItems={"center"} item xs={12} md={4}>
//     {mobileOpen && (
//       <Grid item xs={2}>
//         <HomeIcon
//           sx={{
// fontSize: 24,
//             color: isHomeActive ? "secondary.dark" : "#fff",
//           }}
//         />
//       </Grid>
//     )}
//     <Grid item>
// <Button
//   component={isHomeActive ? "" : Link}
//   href={`/${lang}/`}
//   sx={{
//     mx: 1,
//     color: isHomeActive ? "secondary.dark" : "#fff",
//   }}
// >
//   <Typography variant="h6">
//     {localePageContent.heading.navigation[0]}
//   </Typography>
// </Button>
//     </Grid>
//   </Grid>
//   <Grid container alignItems={"center"} item xs={12} md={4}>
//     {mobileOpen && (
//       <Grid item xs={2}>
//         <AccountCircleIcon
//           sx={{
//             fontSize: 24,
//             color: isProfileActive ? "secondary.dark" : "#fff",
//           }}
//         />
//       </Grid>
//     )}
//     <Grid item>
//       <Button
//         component={isProfileActive ? "" : Link}
//         href={`/${lang}/profile`}
//         sx={{
//           mx: 1,
//           color: isProfileActive ? "secondary.dark" : "#fff",
//         }}
//       >
//         <Typography variant="h6">
//           {localePageContent.heading.navigation[1]}
//         </Typography>
//       </Button>
//     </Grid>
//   </Grid>
//   <Grid container alignItems={"center"} item xs={12} md={4}>
//     {mobileOpen && (
//       <Grid item xs={2}>
//         <SavingsIcon
//           sx={{
//             fontSize: 24,
//             color: isLoanApplyActive ? "secondary.dark" : "#fff",
//           }}
//         />
//       </Grid>
//     )}
//     <Button
//       component={isLoanApplyActive ? "" : Link}
//       href={`/${lang}/loan`}
//       sx={{
//         mx: 1,
//         color: isLoanApplyActive ? "secondary.dark" : "#fff",
//       }}
//     >
//       <Typography variant="h6">
//         {localePageContent.heading.navigation[2]}
//       </Typography>
//     </Button>
//   </Grid>
//   <Box width={"100%"} display={{xs:'grid',sm:"none"}} height={"1px"} sx={{ bgcolor: "darkgray" }} />
//   <Grid container alignItems={"center"} display={{xs:'block',sm:'none'}} item xs={12} md={4}>
//     {mobileOpen && (
//       <Grid item xs={2}>
//         <LogoutIcon
//           sx={{
//             fontSize: 24,
//             color: "#fff",
//           }}
//         />
//       </Grid>
//     )}
//     <Button
//       component={isLoanApplyActive ? "" : Link}
//       href={`/${lang}/loan`}
//       sx={{
//         mx: 1,
//         color: "#fff",
//       }}
//     >
//       <Typography variant="h6">Logout</Typography>
//     </Button>
//   </Grid>
// </Grid>

"use client";
import { Box, Grid, Typography, Modal, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { glassmorphismStyle } from "@styles/styles.js";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import "@styles/styles.css";
import LoginModal from "./components/LoginModal";
import { signIn } from "next-auth/react";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import getDictionary from "@lib/dictionary";
import { usePathname, useRouter } from "next/navigation";
import Loader from "./components/Loader";
import MuiAlert from "@mui/material/Alert";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useSession } from "next-auth/react";
import { loanDetailsData } from "@public/loans";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function HomeLogin({ params: { lang } }) {
  const { data: session } = useSession({
    required: false,
  });
  const { push } = useRouter();
  const pathName = usePathname();
  const { currentLoan, setCurrentLoan,localePageContent } = useContext(CurrentLoanContext);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoginingIn, setIsLogingin] = useState(false);
  const [loginCredindtials, setLoginCredindtials] = useState({
    email: "",
    password: "",
  });
  const [openStaff, setOpenStaff] = React.useState(false);
  const handleOpenStaffLogin = () => setOpenStaff(true);
  const handleCloseStaffLogin = () => setOpenStaff(false);
  const redirectedPathName = (locale) => {
    if (!pathName) push("/");
    const segments = pathName.split("/");
    console.log(locale);
    segments[1] = locale;
    push(segments.join("/") + "/loan");
  };
  async function handleStaffLogin() {
    try {
      setIsLogingin(true);
      const loginResponse = await signIn("credentials", {
        ...loginCredindtials,
        redirect: false,
      });
      if (loginResponse.error) {
        setIsLogingin(false);
        throw new Error("Invalid Login");
      } else {
        setIsLogingin(false);
        localStorage.removeItem("currentLoan");
        setCurrentLoan((prev) => ({ ...prev, isStaff: true }));
        redirectedPathName(lang);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleGuestLogin() {
    try {
      const loginResponse = await signIn("credentials", {
        ...loginCredindtials,
        redirect: false,
        isGuest: true,
      });
      if (loginResponse.error) {
        throw new Error("Invalid Login");
      } else {
        localStorage.removeItem("currentLoan");
        setCurrentLoan({ ...loanDetailsData[1], isStaff: false });
        redirectedPathName(lang);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // useEffect(() => {
  //   const getPage = async () => {
  //     const localePageContent = await getDictionary(lang);
  //     setlocalePageContent(localePageContent);
  //   };
  //   getPage();
  // }, [currentLoan]);
  return (
    <SnackbarProvider maxSnack={1}>
      <Box>
        {localePageContent.loginPage ? (
          <Grid container  md={12}>
            <Grid
              container
              md={12}
              item
              sx={{ height: { sm: "100%", md: "calc(100vh - 200px)" } }}
            >
              <Grid
                container
                item
                md={7}
                position={"relative"}
                justifyContent={"center"}
                p={4}
                maxHeight={"100%"}
                alignItems={"center"}
                className="loginBackground"
              >
                <Box
                  width={"100%"}
                  height={"100%"}
                  zIndex={1}
                  bgcolor={"rgb(1,1,1,.5)"}
                  position={"absolute"}
                />
                <Grid container zIndex={2} gap={4} item md={12}>
                  <Grid container alignItems={"center"} item md={12} gap={3}>
                    <Grid item md={12}>
                      <Typography
                        variant="h4"
                        fontWeight={"400"}
                        color={"white"}
                      >
                        {localePageContent.loginPage.welcomeText.main}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h3"
                        fontWeight={"600"}
                        color={"#F05030"}
                      >
                        {localePageContent.loginPage.welcomeText.bankName}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" fontWeight={"400"} color={"white"}>
                      {localePageContent.loginPage.staffLoginModalDescription}
                    </Typography>
                  </Grid>
                </Grid>

                {/* <Box width={"100%"} component={"img"} src={businessImg}></Box> */}
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={5}
                justifyContent={"center"}
                bgcolor={"#f6f6f6"}
                alignItems={"center"}
                gap={2}
                p={4}
              >
                <Grid
                  container
                  item
                  justifyContent={"center"}
                  gap={{ xs: 4, xl: 8 }}
                  xs={10}
                  md={12}
                >
                  <Grid item xs={10} md={12}>
                    <Typography
                      textAlign={"center"}
                      variant="h5"
                      fontWeight={"600"}
                    >
                      {localePageContent.loginPage.selectOptionText}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    md={8}
                    onClick={handleOpenStaffLogin}
                    sx={{
                      cursor: "pointer",
                      ...glassmorphismStyle,
                      boxShadow: "-3px 7px 6px -5px rgba(0,0,0,0.37)",
                      border: "none",
                    }}
                    minHeight={"120px"}
                    height={{ xs: "120px" }}
                    maxHeight={{ md: "40%" }}
                  >
                    <Grid
                      container
                      justifyContent={"center"}
                      alignItems={"center"}
                      bgcolor={"#F58232"}
                      item
                      sx={{
                        md: {
                          borderTopLeftRadius: "10px",
                          borderBottomLeftRadius: "10px",
                        },
                      }}
                      md={4}
                    >
                      <BusinessCenterOutlinedIcon
                        sx={{ fontSize: 75, color: "white" }}
                      />
                    </Grid>
                    <Grid
                      justifyContent={"center"}
                      alignItems={"center"}
                      container
                      item
                      xs={12}
                      md={8}
                    >
                      <Typography variant="h6" fontWeight={"500"}>
                        {localePageContent.loginPage.staffOptionText}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    md={8}
                    minHeight={"120px"}
                    height={{ xs: "120px" }}
                    maxHeight={"40%"}
                    onClick={() => handleGuestLogin()}
                    sx={{
                      cursor: "pointer",
                      ...glassmorphismStyle,
                      boxShadow: "-3px 7px 6px -5px rgba(0,0,0,0.37)",
                      border: "none",
                    }}
                  >
                    <Grid
                      container
                      justifyContent={"center"}
                      alignItems={"center"}
                      bgcolor={"#F58232"}
                      item
                      md={4}
                      sx={{
                        md: {
                          borderTopLeftRadius: "10px",
                          borderBottomLeftRadius: "10px",
                        },
                      }}
                    >
                      <Person2OutlinedIcon
                        sx={{ fontSize: 75, color: "white" }}
                      />
                    </Grid>
                    <Grid
                      container
                      justifyContent={"center"}
                      alignItems={"center"}
                      item
                      md={8}
                    >
                      <Typography variant="h6" fontWeight={"500"}>
                        {localePageContent.loginPage.clientOptionText}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Modal
              open={openStaff}
              onClose={handleCloseStaffLogin}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid
                container
                item
                xs={12}
                md={6}
                xl={4}
                sx={{ outline: "none", border: "none" }}
              >
                <LoginModal
                  handleCloseStaffLogin={handleCloseStaffLogin}
                  setLoginCredindtials={setLoginCredindtials}
                  handleStaffLogin={handleStaffLogin}
                  localePageContent={localePageContent}
                  isLoginingIn={isLoginingIn}
                />
              </Grid>
            </Modal>
          </Grid>
        ) : (
          <Grid
            container
            height={"100vh"}
            maxHeight={"calc(100vh - 200px)"}
            item
            md={12}
          >
            <Loader />
          </Grid>
        )}
      </Box>
    </SnackbarProvider>
  );
}

export default HomeLogin;
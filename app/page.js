"use client";
import { Box, Grid, Typography, Modal, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { glassmorphismStyle } from "@styles/styles.js";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import "@styles/styles.css";
import LoginModal from "@components/LoginModal";
import HomeLayout from "@components/layout/HomeLayout";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import { LoginContext } from "@hooks/LoginProvider";
function LoginPage() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:600)");
  const { setCurrentLoan } = useContext(CurrentLoanContext);
  const [loginCredindtials, setLoginCredindtials] = useState({
    email: "",
    password: "",
  });
  const [openStaff, setOpenStaff] = React.useState(false);
  const handleOpenStaffLogin = () => setOpenStaff(true);
  const handleCloseStaffLogin = () => setOpenStaff(false);

  async function handleLogin() {
    try {
      const loginResponse = await signIn("credentials", {
        ...loginCredindtials,
        redirect: false,
      });
      if (loginResponse.error) {
        (loginResponse);
        throw new Error("Invalid Login");
      } else {
        const mockData = loginResponse.data;
        setCurrentLoan((prev) => ({ ...prev, ...mockData, isStaff: true }));
        router.push("/loan");
      }
    } catch (error) {
      (error);
    }
  }
  return (
    <HomeLayout>
      <Grid container maxHeight={"calc(100vh - 200px)"} item md={12}>
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
              height={"100"}
              bgcolor={"rgba(1,1,1,.4)"}
              zIndex={0}
              position={"absolute"}
            />
            <Grid container zIndex={2} gap={4} item md={12}>
              <Grid container alignItems={"center"} item md={12} gap={3}>
                <Grid item md={12}>
                  <Typography variant="h4" fontWeight={"400"} color={"white"}>
                    WELCOME TO
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h3" fontWeight={"600"} color={"#F05030"}>
                    BANQUE DU CARIE
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="h6" fontWeight={"400"} color={"white"}>
                  kindly let us know if you are an esteemed client of our bank
                  or a valued member of our dedicated staff. Your selection will
                  help us direct you to the right resources and support. Thank
                  you for choosing us!
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
                  Select one of the following options to continue
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
                    Apply as a Staff
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
                onClick={() => router.push("/loan")}
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
                  <Person2OutlinedIcon sx={{ fontSize: 75, color: "white" }} />
                </Grid>
                <Grid
                  container
                  justifyContent={"center"}
                  alignItems={"center"}
                  item
                  md={8}
                >
                  <Typography variant="h6" fontWeight={"500"}>
                    Apply as a Client
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
            border: "none",
          }}
        >
          <Grid container item xs={12} md={6} xl={4} margin={"auto"}>
            <LoginModal
              handleCloseStaffLogin={handleCloseStaffLogin}
              setLoginCredindtials={setLoginCredindtials}
              handleLogin={handleLogin}
            />
          </Grid>
        </Modal>
      </Grid>
    </HomeLayout>
  );
}

export default LoginPage;

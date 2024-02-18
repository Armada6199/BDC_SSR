"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Button, Grid, Modal, Typography, useMediaQuery } from "@mui/material";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import { useContext, useState } from "react";
import NagiationsLinks from "./NagiationsLinks";
import Image from "next/image";
import bankWhite from "@public/assets/Banque_du_caire_Logowhite.svg";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirectedPathName } from "@utils/loanCalulation";
import { usePathname } from "next/navigation";
import Loader from "../Loader";
import LoginModal from "../LoginModal";

const drawerWidth = 240;

function ResponsiveHeader(props) {
  const { window } = props;
  const { data: session, status } = useSession({});

  const [mobileOpen, setMobileOpen] = useState(false);
  const { localePageContent, currentLoan } = useContext(CurrentLoanContext);
  const isMobile = useMediaQuery("(max-width:600px)");
  const pathName = usePathname();
  const [openStaff, setOpenStaff] = React.useState(false);
  const handleOpenStaffLogin = () => setOpenStaff(true);
  const handleCloseStaffLogin = () => setOpenStaff(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawer = (
    <Grid
      container
      item
      xs={12}
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", backgroundColor: "background.lightBlack" }}
    >
      {localePageContent && (
        <Grid item xs={12} md={8}>
          <NagiationsLinks
            localePageContent={localePageContent}
            lang={props.lang}
            mobileOpen={mobileOpen}
          />
        </Grid>
      )}
    </Grid>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  if (status == "loading") {
    return (
      <Grid container item>
        <Loader />
      </Grid>
    );
  }
  return localePageContent.heading ? (
    <Box display={"flex"} sx={{ boxSizing: "border-box" }} height={"60px"}>
      <AppBar
        component="nav"
        sx={{
          bgcolor: "background.lightBlack",
          maxHeight: "70px",
          borderBottom: "4px solid ",
          borderColor: "secondary.border",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Grid display={{ xs: "grid", sm: "none" }} item xs={2}>
            <Image src={bankWhite} alt="bankLogo" width="152" height="60" />
          </Grid>
          <Grid container item alignItems={"center"} xs={10} md={12}>
            <Grid container item xs={12} md={10}>
              {!isMobile && (
                <NagiationsLinks
                  localePageContent={localePageContent}
                  lang={props.lang}
                />
              )}
            </Grid>
            <Grid
              container
              item
              md={2}
              justifyContent={"flex-end"}
              alignItems={"center"}
              gap={4}
            >
              <Grid
                item
                component={Link}
                color={"inherit"}
                style={{ textDecoration: "none" }}
                href={
                  `/${redirectedPathName(props.lang == "en" ? "ar" : "en")}` +
                  pathName.split("/").splice(2).join("/")
                }
                sx={{ cursor: "pointer" }}
              >
                <Typography variant="h6">
                  {localePageContent.switchLanguageLabel}
                </Typography>
              </Grid>
              {session ? (
                <Grid
                  item
                  sx={{ color: "#fff", cursor: "pointer" }}
                  onClick={() => {
                    signOut({ callbackUrl: `/${props.lang}` });
                  }}
                  display={{
                    xs: "none",
                    md: session ? "grid" : "none",
                  }}
                >
                  <Button
                    variant="text"
                    onClick={handleOpenStaffLogin}
                    sx={{ color: "#fff", fontSize: 20 }}
                    fullWidth
                  >
                    {localePageContent.heading.logoutLabel}
                  </Button>
                </Grid>
              ) : (
                !currentLoan.isClient && (
                  <Grid item xs={4} sx={{ color: "#fff", cursor: "pointer" }}>
                    <Button
                      variant="contained"
                      onClick={handleOpenStaffLogin}
                      sx={{
                        bgcolor: "secondary.main",
                        color: "#fff",
                        fontSize: 20,
                      }}
                      fullWidth
                    >
                      Login
                    </Button>
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
      <Modal
        open={openStaff}
        onClose={handleCloseStaffLogin}
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
            localePageContent={localePageContent}
            lang={props.lang}
          />
        </Grid>
      </Modal>
    </Box>
  ) : (
    <Grid
      container
      sx={{ bgcolor: "background.lightBlack" }}
      height={"60px"}
    ></Grid>
  );
}

export default ResponsiveHeader;

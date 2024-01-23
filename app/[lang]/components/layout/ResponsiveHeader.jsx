"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import { useContext, useState } from "react";
import Loader from "../Loader";
import { redirectedPathName } from "@utils/loanCalulation";
import NagiationsLinks from "./NagiationsLinks";
import bankWhite from "@public/assets/Banque_du_caire_Logowhite.svg";

const drawerWidth = 240;

function ResponsiveHeader(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { localePageContent } = useContext(CurrentLoanContext);

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
        <Grid height={'90%'} item  xs={12}>
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

  return localePageContent.heading ? (
    <Box display={"flex"} sx={{ boxSizing: "border-box" }} height={"70px"}>
      <AppBar
        component="nav"
        sx={{
          bgcolor: "background.lightBlack",
          maxHeight: "70px",
          borderBottom: "4px solid ",
          borderColor: "secondary.border",
        }}
      >
        {console.log(localePageContent)}
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Grid container alignItems={"center"} gap={4} md={12}>
            <Grid item>
              <Image src={bankWhite} alt="bankLogo" width="152" height="60" />
            </Grid>
            <Grid
              container
              item
              md={8}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <NagiationsLinks
                localePageContent={localePageContent}
                lang={props.lang}
              />
            </Grid>
            <Grid
              item
              md={2}
              display={{ xs: "none", sm: "block" }}
              component={Link}
              href={redirectedPathName(props.lang == "en" ? "ar" : "en")}
              sx={{ cursor: "pointer", textDecoration: "none" }}
            >
              <Typography variant="h6" textAlign={"end"} color={"white"}>
                {localePageContent.switchLanguageLabel}
              </Typography>
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
            keepMounted: true, // Better open performance on mobile.
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
    </Box>
  ) : (
    <Grid container item>
      <Loader />
    </Grid>
  );
}

export default ResponsiveHeader;

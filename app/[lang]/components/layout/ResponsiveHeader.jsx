"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Grid,  useMediaQuery } from "@mui/material";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import { useContext, useState } from "react";
import Loader from "../Loader";
import NagiationsLinks from "./NagiationsLinks";
import Image from "next/image";
import bankWhite from "@public/assets/Banque_du_caire_Logowhite.svg";

const drawerWidth = 240;

function ResponsiveHeader(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { localePageContent } = useContext(CurrentLoanContext);
  const isMobile = useMediaQuery("(max-width:600px)");
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawer = (
    <Grid
      container
      item
      xs={12}
      onClick={handleDrawerToggle}
      m={0}
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
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Grid display={{xs:'grid',sm:'none'}} item xs={2}>
          <Image src={bankWhite} alt="bankLogo" width="152" height="60" />
          </Grid>
          <Grid container item alignItems={"center"} xs={10} md={12}>
            <Grid container item xs={12} md={12}>
              {!isMobile && (
                <NagiationsLinks
                  localePageContent={localePageContent}
                  lang={props.lang}
                />
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
    </Box>  
  ) : (
    <Grid container   sx={{bgcolor:'background.lightBlack'}} height={'60px'}>
    </Grid>
  );
}

export default ResponsiveHeader;

import React from "react";
import bankLogoDark from "@public/assets/Banque_du_caire_Logodark.svg";
import {
  Grid,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import { glassmorphismStyle } from "@styles/styles.js";
import ClearIcon from "@mui/icons-material/Clear";
import Image from "next/image";

function LoginModal({
  setLoginCredindtials,
  handleLogin,
  handleCloseStaffLogin,
  pageContent,
}) {
  return (
    <Grid
      container
      item
      md={12}
      p={4}
      justifyContent={"center"}
      gap={4}
      sx={{ ...glassmorphismStyle, borderRadius: "30px"}}
      height={{ xs: "90vh", md: "95vh", xl: "80vh" }}
    >
      <ClearIcon
        onClick={handleCloseStaffLogin}
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: 32,
          cursor: "pointer",
        }}
      />
      <Grid container justifyContent={"center"} item md={12}>
        <Image
          src={bankLogoDark}
          alt="loginImg"
          width={"200"}
          height={"40"}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography textAlign={"center"} variant="h4" fontWeight={"600"}>
          {pageContent.loginPage.staffLoginModalTitle}
        </Typography>
      </Grid>
      <Grid item md={12}>
        <Typography
          textAlign={"center"}
          variant="h6"
          color={"gray"}
          fontWeight={"600"}
        >
          {pageContent.loginPage.staffLoginModalDescription}
        </Typography>
      </Grid>
      <Grid container item justifyContent={"center"} xs={12} md={8} gap={4}>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            label= {pageContent.loginPage.modalEmail}
            onChange={(e) =>
              setLoginCredindtials((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            type="email"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            label= {pageContent.loginPage.modalPassword}

            type="password"
            onChange={(e) =>
              setLoginCredindtials((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            variant="outlined"
          />
        </Grid>
        <Grid container item xs={12} alignItems={"center"}>
          <Grid item xs={6} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "#215190",
                    "&.Mui-checked": {
                      color: "#F58232",
                    },
                  }}
                  defaultChecked
                />
              }
              label= {pageContent.loginPage.rememberMe}

            />
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography fontWeight={"600"} textAlign={"end"}>
            {pageContent.loginPage.forgotPassword}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={10} md={12}>
          <Button
            fullWidth
            onClick={handleLogin}
            variant="contained"
            sx={{ bgcolor: "#F58232" }}
          >
          {pageContent.loginPage.loginButtonText}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LoginModal;

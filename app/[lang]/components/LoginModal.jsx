import React, { useContext, useState } from "react";
import bankLogoDark from "@public/assets/Banque_du_caire_Logodark.svg";
import {
  Grid,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Alert,
} from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import { glassmorphismStyle } from "@styles/styles.js";
import ClearIcon from "@mui/icons-material/Clear";
import Image from "next/image";
import "@/styles/styles.css";
import { signIn } from "next-auth/react";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import { usePathname } from "next/navigation";
function LoginModal({
  handleCloseStaffLogin=false,
  lang
}) {
  const [isLoginingIn, setIsLogingin] = useState(false);
  const pathName=usePathname()
  const [loginCredindtials, setLoginCredindtials] = useState({
    email: "",
    password: "",
  });
  const showStaffMessage=pathName===`/${lang}/profile`;
  const { currentLoan, setCurrentLoan, localePageContent } =
    useContext(CurrentLoanContext);
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
 
  return (
    <Grid
      container
      item
      md={12}
      p={4}
      justifyContent={"center"}
      gap={4}
      sx={{ ...glassmorphismStyle, borderRadius: "30px" }}
      height={{ xs: "90vh", md: "95vh", xl: "80vh" }}
    >
      {showStaffMessage&&<ClearIcon
        onClick={handleCloseStaffLogin}
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: 32,
          cursor: "pointer",
        }}
      />}
      <Grid container justifyContent={"center"} item md={12}>
        <Image src={bankLogoDark} alt="loginImg" width={"200"} height={"40"} />
      </Grid>
      <Grid item xs={12}>
        <Typography textAlign={"center"} variant="h4" fontWeight={"600"}>
          {localePageContent.loginPage.staffLoginModalTitle}
        </Typography>
      </Grid>
      <Grid item md={12}>
        <Typography
          textAlign={"center"}
          variant="h6"
          color={"gray"}
          fontWeight={"600"}
        >
          {localePageContent.loginPage.staffLoginModalDescription}
        </Typography>
      </Grid>
      <Grid container item justifyContent={"center"} xs={12} md={8} gap={4}>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            label={localePageContent.loginPage.modalEmail}
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
            label={localePageContent.loginPage.modalPassword}
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
              label={localePageContent.loginPage.rememberMe}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography fontWeight={"600"} textAlign={"end"}>
              {localePageContent.loginPage.forgotPassword}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={10} md={12}>
          <Button
            fullWidth
            onClick={handleStaffLogin}
            disabled={isLoginingIn}
            variant="contained"
            severity="danger"
            sx={{ bgcolor: "#F58232" }}
          >
            {isLoginingIn ? (
              <div  style={{color:'#fff'}} className="download_loader"></div>
            ) : (
              localePageContent.loginPage.loginButtonText
            )}
          </Button>
        </Grid>
      </Grid>
      {showStaffMessage&&
      <Snackbar
        open={true}
        autoHideDuration={6000}
        severity="danger"
      >
           <Alert
          severity="warning"
          variant="filled"
          sx={{ width: '100%' }}
        >
            <Typography variant="body1" fontWeight={'500'} >{localePageContent.loginPage.guestWarningMessage}</Typography>
        </Alert>
      </Snackbar>}
    </Grid>
  );
}

export default LoginModal;

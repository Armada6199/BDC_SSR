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
import Snackbar from "@mui/material/Snackbar";
import { glassmorphismStyle } from "@styles/styles.js";
import ClearIcon from "@mui/icons-material/Clear";
import Image from "next/image";
import "@/styles/styles.css";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import { usePathname } from "next/navigation";
import { handleStaffLogin } from "@utils/apiRequests";
import { useRouter } from "next/navigation";
import { redirectedPathName } from "@utils/loanCalulation";
function LoginModal({ handleCloseStaffLogin, lang }) {
  const [isLoginingIn, setIsLogingin] = useState(false);
  const pathName = usePathname();
  const { push } = useRouter();
  const [loginCredindtials, setLoginCredindtials] = useState({
    username: "",
    password: "",
  });
  const showStaffMessage = pathName === `/${lang}/profile`;
  const { setLoanInfo, localePageContent } = useContext(CurrentLoanContext);

  return (
    <Grid
      container
      item
      md={12}
      p={4}
      justifyContent={"center"}
      gap={4}
      sx={{ ...glassmorphismStyle, borderRadius: "30px" }}
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
                username: e.target.value,
              }))
            }
            type="text"
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
            onClick={async () => {
              await handleStaffLogin(loginCredindtials, setIsLogingin);
              push(redirectedPathName(lang) + "/loan");
              handleCloseStaffLogin();
            }}
            disabled={isLoginingIn}
            variant="contained"
            severity="danger"
            sx={{ bgcolor: "#F58232" }}
          >
            {isLoginingIn ? (
              <div style={{ color: "#fff" }} className="download_loader"></div>
            ) : (
              localePageContent.loginPage.loginButtonText
            )}
          </Button>
        </Grid>
      </Grid>
      {showStaffMessage && (
        <Snackbar open={true} autoHideDuration={6000} severity="danger">
          <Alert severity="warning" variant="filled" sx={{ width: "100%" }}>
            <Typography variant="body1" fontWeight={"500"}>
              {localePageContent.loginPage.guestWarningMessage}
            </Typography>
          </Alert>
        </Snackbar>
      )}
    </Grid>
  );
}

export default LoginModal;

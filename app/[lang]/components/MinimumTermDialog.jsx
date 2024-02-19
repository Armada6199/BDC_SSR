"use client";
import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Grid } from "@mui/material";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import { glassmorphismStyle } from "@styles/styles";
import { ClearIcon } from "@mui/x-date-pickers";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MinimumTermDialog({
  openMinDialog,
  setOpenMinDialog,
  errors,
}) {
  const handleClose = () => {
    setOpenMinDialog(false);
  };
  const { currentLoan } = useContext(CurrentLoanContext);
  return (
    <React.Fragment>
      <Dialog
        open={openMinDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Grid container item alignItems={"center"} p={2}>
          <Grid item>
            <DialogTitle
              sx={{
                color: "secondary.dark",
                borderBottomLeftRadius: "0",
                borderBottomRightRadius: "0",
              }}
            >
              {errors?.numberOfMonths_Input?.message ||
                errors?.numberOfMonths_Slider?.message}
            </DialogTitle>
          </Grid>
          <Button endIcon={<ClearIcon />} onClick={handleClose}>
            Close
          </Button>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}

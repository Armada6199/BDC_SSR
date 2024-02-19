const { Snackbar, Alert } = require("@mui/material");
export const CustomSnackbar = ({ openSnack, handleClose, lang }) => {
  return (
    <Snackbar
      open={openSnack.isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={handleClose}
        severity={openSnack.status == 200 ? "success" : "error"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {openSnack.message}
      </Alert>
    </Snackbar>
  );
};

export const glassmorphismStyle = {
    background: "rgba( 255, 255, 255, 1 )",
    boxShadow: "0 2px 10px 0 rgba( 0, 7, 7, 0.09 )",
    backdropFilter: "blur( 6px )",
    borderRadius: "10px ",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
  };

  export const loanTypesBoxesStyle = {
    minWidth:'165px',
    height: "139px",
    padding: 1,
    ...glassmorphismStyle,
    borderRadius: "20px",
    boxShadow:"-1px 2px 10px -1px rgba(0,0,0,0.24)"
  };
  export  const loanIconContStyle = {
    display: "flex",
    borderRadius: "50%",
    height: "58px",
    width: "58px",
    justifyContent: "center",
    alignItems: "center",
  };
  export const loansIconStyle = {
    width: "31px",
    height: "41px",
    color: "#fff",
  };
  export const loanInfoInputStyle = {
    alignSelf: "flex-end",
    width: "100%",
    ...glassmorphismStyle,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "none",
        border: "none",
      },
      "&:hover fieldset": {
        borderColor: "none",
        border: "none",
      },
      "&.Mui-focused fieldset": {
        borderColor: "none",
        border: "none",
      },
    },
  };
 export const documentButtonsStyles={
    ".MuiButton-outlined": {
      borderColor:'#215190'
      },
  }
  export const floatingIconContStyle={
    m: "0 auto",
    borderRadius: "50%",
    width: 90,
    height: 90,
    transform: 'translate(-50%, -10%)',
    left:"50%",
    boxShadow: "sm",
    bgcolor: "#fff",
    border: "1px solid",
    borderColor: "secondary.dark",
    position: "absolute",
    zIndex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
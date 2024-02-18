import { createTheme } from "@mui/material";
import { DM_Sans } from "next/font/google";
const dmFont = DM_Sans({
  weight: ["100", "200", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});
const theme = (dir) =>
  createTheme({
    direction: dir,

    components: {
      input: {
        "& input.Mui-disabled": {
          color: "red",
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            height: "50px",

            ":hover": {
              borderColor: "#dd752d",
            },
          },
        },
      },
    },
    typography: {
      fontFamily: [dmFont.style.fontFamily, "sans-serif"].join(","),
      typography: {
        allVariants: {
          color: "#1A191E",
        },
      },
    },
    palette: {
      primary: {
        main: "#1A191E",
        bluish: "#215190",
      },
      secondary: {
        main: "#F58232",
        dark: "#dd752d",
        border: "#F05030",
        light: "#f58232",
      },
      background: {
        default: "#F1F3F4",
        lightBlack: "#424242",
      },
      // secondary: purple,
    },
  });

export default theme;

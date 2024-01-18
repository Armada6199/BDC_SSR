import { createTheme } from "@mui/material";
const theme= (dir)=>createTheme({
  direction:dir,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            height:'50px',
          ':hover':{
            borderColor:'#dd752d'
          }
          },
        
        },
        
      },
    },
    typography: {
      fontFamily: [
        'DM Sans',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    palette: {
      primary: {
        main:'#1A191E',
        bluish:'#215190'
      },
      secondary:{
        main:'#F58232',
        dark:'#dd752d',
        light:"#f58232",
      },
      background: {
        default: "#F1F3F4",
        lightBlack:"#424242"
      },
      // secondary: purple,
    },
  
  });

  export default theme;
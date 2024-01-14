import { createTheme } from "@mui/material";

const theme= createTheme({
    direction: 'ltr',
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            height:'50px',
          
          },
          '&:hover': {
            backgroundColor: 'secondary.light !important'
          }
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
        main:'#C4B28F',
        dark:'#b0a080',
        light:"#D5C9B0",
      },
      background: {
        default: "#F1F3F4"
      },
      // secondary: purple,
    },
  
  });

  export default theme;
import { createTheme, Theme } from "@mui/material";

export const theme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#066163", // Replace with your primary color tail
      light: "#F2F2F2",
      dark: "#383838",
      contrastText: "#CDBE78",
    },
    secondary: {
      main: "#066163", // Replace with your primary color tail
      light: "#F2F2F2",
      dark: "#383838",
      contrastText: "#CDBE78",
    },

    background: {
      default: "#F2F2F2",
    },
    text: {
      primary: "#066163",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Replace with your desired font-family
    button: {
      color: "#CDBE78",
    },
  },
});

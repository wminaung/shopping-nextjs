import { createTheme, PaletteMode, Theme, ThemeOptions } from "@mui/material";

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
      background: "",
    },
  },
});
export const getDesignTokens = (mode: PaletteMode) =>
  ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
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
          }
        : {
            primary: {
              main: "#CDBE78", // Replace with your primary color tail
              light: "#F2F2F2",
              dark: "#383838",
              contrastText: "#066163",
            },
            secondary: {
              main: "#CDBE78", // Replace with your primary color tail
              light: "#F2F2F2",
              dark: "#383838",
              contrastText: "#066163",
            },

            background: {
              default: "#383838",
            },
            text: {
              primary: "#cdbe78",
              secondary: "#cdbe78",
            },
          }),
    },
    typography: {
      fontFamily: "Roboto, sans-serif", // Replace with your desired font-family
    },
  } as ThemeOptions);

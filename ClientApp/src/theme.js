import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#efebce",
      light: "#ffffff",
      dark: "#bcb99d",
      contrastText: "#000000"
    },
    secondary: {
      main: "#bb8588",
      light: "#eeb5b8",
      dark: "#8a585b",
      contrastText: "#000000"
    }
  },
  typography: {
    fontFamily: [
      "'Inria Sans'",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
});

export default theme;

import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#263238",
    },
    type: "dark",
    primary: {
      main: "#4527a0",
    },
    secondary: {
      main: "#fdd835",
    },
  },
});

export default function Customization({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

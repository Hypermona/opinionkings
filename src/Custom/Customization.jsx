import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#263238",
    },
    type: "light",
    primary: {
      main: "#640DA8",
    },
    secondary: {
      main: "#E2F05D",
    },
  },
});

export default function Customization({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = createMuiTheme({
    palette: {
      background: {
        default: prefersDarkMode ? "#442A57" : "#C77DFF",
      },
      type: prefersDarkMode ? "dark" : "light",
      primary: {
        main: "#3C0863",
      },
      secondary: {
        main: "#CADB2A",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

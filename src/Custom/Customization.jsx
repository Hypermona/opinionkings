import React, { useEffect } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import deepPurple from "@material-ui/core/colors/deepPurple";
import State from "../Store/state";

export default function Customization({ children }) {
  const state = State.useContainer();
  const { theme: preferedTheme } = state.theme;
  const { setFinalTheme } = state.finalTheme;

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");
  const finalTheme = prefersDarkMode ^ preferedTheme;

  useEffect(() => {
    setFinalTheme(finalTheme);
  });

  const theme = createMuiTheme({
    palette: {
      background: {
        default: finalTheme ? "#1C1124" : "#fcf7fc",
        paper: finalTheme ? "#22142a" : "#ffffff",
      },
      type: finalTheme ? "dark" : "light",
      primary: {
        main: finalTheme ? "#372044" : deepPurple[900],
      },
      contrastThreshold: 4,
      tonalOffset: 0.4,
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

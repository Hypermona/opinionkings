import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
import deepPurple from "@material-ui/core/colors/deepPurple";
import { setFinalTheme } from "../Redux/finalTheme";

export default function Customization({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");
  const { preferedTheme } = useSelector((state) => state.theme);
  const finalTheme = prefersDarkMode ^ preferedTheme;
  const dispatch = useDispatch();

  dispatch(setFinalTheme(finalTheme));

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

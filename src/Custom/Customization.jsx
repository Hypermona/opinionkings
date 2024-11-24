import React, { useEffect } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import deepPurple from "@material-ui/core/colors/deepPurple";
import Theme from "../Store/theme";
import FinalTheme from "../Store/finalTheme";

const primary = {
  main: "#372044",
  light: deepPurple[900],
};
const secondary = "#CADB2A";
const paper = {
  dark: "#22142a",
  light: "#ffffff",
};
export { primary, secondary, paper };
export default function Customization({ children }) {
  const { theme: preferedTheme } = Theme.useContainer();
  const { setFinalTheme } = FinalTheme.useContainer();

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
        main: finalTheme ? primary.main : primary.light,
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

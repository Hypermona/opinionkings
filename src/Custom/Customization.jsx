import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector } from "react-redux";

export default function Customization({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");
  const { preferedTheme } = useSelector((state) => state.theme);
  const finalTheme = prefersDarkMode ^ preferedTheme;
  const theme = createMuiTheme({
    palette: {
      background: {
        default: finalTheme ? "#1C1124" : "#f3e5f5",
        paper: finalTheme ? "#321F40" : "#CDA1FF",
      },
      type: finalTheme ? "dark" : "light",
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

import { createTheme } from "@mui/material";

// Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

// Light Theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#000000",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

// GitHub Theme
const githubTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#24292e",
    },
    secondary: {
      main: "#0366d6",
    },
    background: {
      default: "#0d1117",
      paper: "#161b22",
    },
    text: {
      primary: "#c9d1d9",
      secondary: "#8b949e",
    },
  },
  typography: {
    fontFamily: "Segoe UI, Helvetica, Arial, sans-serif",
  },
});

// Facebook Theme
const facebookTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1877f2",
    },
    secondary: {
      main: "#42b72a",
    },
    background: {
      default: "#ffffff",
      paper: "#f0f2f5",
    },
    text: {
      primary: "#050505",
      secondary: "#65676b",
    },
  },
  typography: {
    fontFamily: "Helvetica, Arial, sans-serif",
  },
});

// Twitter Theme
const tealandGray = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#008080", // Teal
    },
    secondary: {
      main: "#4f4f4f", // Gray
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#e0f7fa", // Light Teal
      secondary: "#b0bec5", // Light Gray
    },
  },
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
  },
});

export { darkTheme, lightTheme, githubTheme, facebookTheme, tealandGray as twitterTheme };
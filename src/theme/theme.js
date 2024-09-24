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

// Blue Theme
const blueTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#03a9f4",
    },
    background: {
      default: "#e3f2fd",
      paper: "#bbdefb",
    },
    text: {
      primary: "#0d47a1",
      secondary: "#1976d2",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

// Green Theme
const greenTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4caf50",
    },
    secondary: {
      main: "#8bc34a",
    },
    background: {
      default: "#e8f5e9",
      paper: "#c8e6c9",
    },
    text: {
      primary: "#1b5e20",
      secondary: "#388e3c",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

// Red Theme
const redTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#f44336",
    },
    secondary: {
      main: "#e57373",
    },
    background: {
      default: "#ffebee",
      paper: "#ffcdd2",
    },
    text: {
      primary: "#b71c1c",
      secondary: "#d32f2f",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

export { darkTheme, lightTheme, blueTheme, greenTheme, redTheme };
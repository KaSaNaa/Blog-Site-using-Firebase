import { createTheme } from '@mui/material';

const baseTypography = {
  fontFamily: 'Inter, Arial, sans-serif',
  h1: {
    fontWeight: 700,
  },
  h2: {
    fontWeight: 700,
  },
  h3: {
    fontWeight: 600,
  },
  h4: {
    fontWeight: 600,
  },
  h5: {
    fontWeight: 500,
  },
  h6: {
    fontWeight: 500,
  },
  subtitle1: {
    fontWeight: 400,
  },
  subtitle2: {
    fontWeight: 400,
  },
  body1: {
    fontWeight: 400,
  },
  body2: {
    fontWeight: 400,
  },
  button: {
    fontWeight: 600,
  },
  caption: {
    fontWeight: 400,
  },
  overline: {
    fontWeight: 400,
  },
};

// Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4a148c', // Darker Purple
    },
    secondary: {
      main: '#880e4f', // Darker Pink
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  typography: baseTypography,
});

// Light Theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#000000',
      secondary: '#757575',
    },
  },
  typography: baseTypography,
});

// GitHub Theme
const githubTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e040fb', // Vibrant Neon Purple
    },
    secondary: {
      main: '#1e3a8a', // Dark Blue
    },
    background: {
      default: '#0d1117',
      paper: '#161b22',
    },
    text: {
      primary: '#c9d1d9',
      secondary: '#8b949e',
    },
  },
  typography: baseTypography,
});

// Facebook Theme
const facebookTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1769e8', // Darker Blue
    },
    secondary: {
      main: '#1b5e20', // Darker Green
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  typography: {
    ...baseTypography,
    fontFamily: 'Helvetica, Arial, sans-serif',
  },
});

// Twitter Theme
const twitterTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#004d40', // Darker Teal
    },
    secondary: {
      main: '#263238', // Darker Gray
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#e0f7fa', // Light Teal
      secondary: '#b0bec5', // Light Gray
    },
  },
  typography: baseTypography,
});

export {
  darkTheme,
  lightTheme,
  githubTheme,
  facebookTheme,
  twitterTheme,
};
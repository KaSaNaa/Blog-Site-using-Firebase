import { useEffect } from 'react';
import { Container, Typography, Box, Button, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212', // Dark background color
    },
    text: {
      primary: '#ffffff', // White text color
    },
  },
});

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate('/login');
    }
  }, [navigate]);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
            minHeight: '100vh',
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Login Successful!
          </Typography>
          <Typography variant="body1" gutterBottom>
            You have successfully logged in.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGoHome}
            sx={{ mt: 3 }}
          >
            Go to Home
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginSuccess;
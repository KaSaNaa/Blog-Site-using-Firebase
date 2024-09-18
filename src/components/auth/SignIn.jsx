import { useState } from 'react';
import { Typography, TextField, Button, Box, Container, Grid, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

// eslint-disable-next-line react/prop-types
const SignIn = ({ handleEmailSignIn, handleGoogleSignIn, handleGithubSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEmailSignIn(email, password);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#333", fontWeight: "bold" }}>
          Sign In
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ color: "#666" }}>
          Access your account
        </Typography>
        <Divider sx={{ my: 3 }} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: <EmailIcon sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: <LockIcon sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
        <Divider sx={{ my: 3 }}><Typography>OR</Typography></Divider>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              sx={{ backgroundColor: '#4285F4', color: '#fff', '&:hover': { backgroundColor: '#357ae8' } }}
            >
              Sign in with Google
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<GitHubIcon />}
              onClick={handleGithubSignIn}
              sx={{ backgroundColor: '#333', color: '#fff', '&:hover': { backgroundColor: '#24292e' } }}
            >
              Sign in with GitHub
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignIn;
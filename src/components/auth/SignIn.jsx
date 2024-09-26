/**
 * SignIn component renders a sign-in form with options for signing in using email/password,
 * Google, or GitHub. If the user is already signed in, it displays a message and redirects to the home page.
 *
 * @component
 * @example
 * return (
 *   <SignIn />
 * )
 *
 * @returns {JSX.Element} The rendered SignIn component.
 *
 * @requires useContext
 * @requires useState
 * @requires @mui/material.Typography
 * @requires @mui/material.TextField
 * @requires @mui/material.Button
 * @requires @mui/material.Box
 * @requires @mui/material.Container
 * @requires @mui/material.Grid
 * @requires @mui/material.Divider
 * @requires @mui/icons-material.Google
 * @requires @mui/icons-material.GitHub
 * @requires @mui/icons-material.Email
 * @requires @mui/icons-material.Lock
 * @requires ../../services/authentication
 * @requires react-router-dom.Link
 * @requires react-router-dom.Navigate
 * @requires ../../contexts/AuthContext
 */
import { useContext, useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Container,
  Grid,
  Divider,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import useAuth from '../../services/authentication';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const { user } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const { handleGoogleSignIn, handleGithubSignIn, handleEmailSignIn } =
    useAuth();

  if (user) {
    return (
      <>
        {/* show an alert saying user is already signed in */}
        <Typography>User is already signed in</Typography>
        <Navigate to="/" />
      </>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEmailSignIn(email, password);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Sign In
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
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
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Don&apos;t have an account?&nbsp;
                  <Link to="/signup">
                    <Typography>Sign up here</Typography>
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </form>
        <Divider sx={{ my: 3 }}>
          <Typography>OR</Typography>
        </Divider>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              sx={{
                '&:hover': { backgroundColor: '#357ae8' },
              }}
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
              sx={{
                backgroundColor: '#333',
                color: '#fff',
                '&:hover': { backgroundColor: '#24292e' },
              }}
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

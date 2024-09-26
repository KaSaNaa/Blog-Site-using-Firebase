import { auth } from '../../configs/firebaseConfigs';
import { signOut } from 'firebase/auth';
import { Button, Box, Typography } from '@mui/material';

/**
 * SignOut component provides a button for users to sign out of the application.
 * It prompts the user for confirmation before proceeding with the sign-out process.
 * If the sign-out is successful, a success message is displayed.
 * If there is an error during the sign-out process, an error message is displayed.
 *
 * @component
 * @example
 * return (
 *   <SignOut />
 * )
 */
const SignOut = () => {
  const handleSignOut = async () => {
    const confirmed = window.confirm('Are you sure you want to sign out?');
    if (!confirmed) {
      return;
    }
    try {
      await signOut(auth);
      alert('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Error signing out');
    }
  };
  return (
    <Box>
      <Typography variant="h4">Sign Out</Typography>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </Box>
  );
};

export default SignOut;

import { auth } from "../../configs/firebaseConfigs";
import { signOut } from "firebase/auth";
import { Button, Box, Typography } from "@mui/material";

const SignOut = () => {
  const handleSignOut = async () => {
    const confirmed = window.confirm("Are you sure you want to sign out?");
    if (!confirmed) {
      return;
    }
    try {
      await signOut(auth);
      alert("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Error signing out");
    }
  };
// TODO: add two steps to sign out instead of immediately signing out.
  return (
    <Box>
      <Typography variant="h4">Sign Out</Typography>
      <Button variant="contained" color="secondary" fullWidth onClick={handleSignOut}>
        Sign Out
      </Button>
    </Box>
  );
};

export default SignOut;
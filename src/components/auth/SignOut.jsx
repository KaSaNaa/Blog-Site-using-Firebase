import { auth } from "../../configs/firebaseConfigs";
import { signOut } from "firebase/auth";
import { Button, Box, Typography } from "@mui/material";

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Error signing out");
    }
  };

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
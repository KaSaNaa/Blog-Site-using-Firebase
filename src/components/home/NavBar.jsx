import { useContext, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../configs/firebaseConfigs";
import { useThemeContext } from "../../contexts/ThemeContext"; // Correct import

function NavBar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { theme, changeTheme } = useThemeContext(); // Use ThemeContext
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(theme.name || "dark");

  useEffect(() => {
    setSelectedTheme(theme.name); // Synchronize initial theme state
  }, [theme]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    navigate("/signin");
  };

  const handleSignOut = async () => {
    const confirmed = window.confirm("Are you sure you want to sign out?");
    if (!confirmed) {
      return;
    }
    try {
      await signOut(auth);
      setUser(null);
      alert("Signed out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Error signing out");
    }
  };

  const handleThemeChange = (event) => {
    const selectedTheme = event.target.value;
    setSelectedTheme(selectedTheme);
    changeTheme(selectedTheme);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Dev@Deakin
          </Typography>
          <FormControl
            variant="outlined"
            sx={{ minWidth: 120, marginRight: 2 }}
          >
            <InputLabel>Theme</InputLabel>
            <Select
              value={selectedTheme}
              onChange={handleThemeChange}
              label="Theme"
              color="inherit"
            >
              <MenuItem value="dark">Dark</MenuItem>
              <MenuItem value="light">Light</MenuItem>
              <MenuItem value="blue">Blue</MenuItem>
              <MenuItem value="green">Green</MenuItem>
              <MenuItem value="red">Red</MenuItem>
            </Select>
          </FormControl>
          {user ? (
            <>
              <Avatar
                alt={user.displayName}
                src={user.photoURL}
                sx={{ marginRight: 2 }}
              />
              <Typography
                variant="body1"
                color="inherit"
                sx={{ marginRight: 2 }}
              >
                {user.displayName}
              </Typography>
              <Button color="inherit" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLoginClick}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            navigate("/find-questions");
            handleMenuClose();
          }}
        >
          Find Questions
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/post-something");
            handleMenuClose();
          }}
        >
          Post Something
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default NavBar;

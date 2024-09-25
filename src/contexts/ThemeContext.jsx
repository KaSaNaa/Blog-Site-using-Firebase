/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";
import {
  darkTheme,
  lightTheme,
  twitterTheme,
  facebookTheme,
  githubTheme,
} from "../theme/theme";

export const ThemeContext = createContext(); // Export ThemeContext

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({ ...darkTheme, name: "dark" }); // Ensure theme has a name property

  const changeTheme = (themeName) => {
    switch (themeName) {
      case "dark":
        setTheme({ ...darkTheme, name: "dark" });
        break;
      case "light":
        setTheme({ ...lightTheme, name: "light" });
        break;
      case "twitter":
        setTheme({ ...twitterTheme, name: "twitter" });
        break;
      case "facebook":
        setTheme({ ...facebookTheme, name: "facebook" });
        break;
      case "github":
        setTheme({ ...githubTheme, name: "github" });
        break;
      default:
        setTheme({ ...darkTheme, name: "dark" });
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext); // Ensure correct export

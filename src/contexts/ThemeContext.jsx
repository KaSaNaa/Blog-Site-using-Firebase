/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from 'react';
import {
  darkTheme,
  lightTheme,
  twitterTheme,
  facebookTheme,
  githubTheme,
} from '../theme/theme';

export const ThemeContext = createContext(); // Export ThemeContext

/**
 * ThemeProvider component that provides theme context to its children.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components that will have access to the theme context.
 * @returns {JSX.Element} The ThemeContext provider with the current theme and changeTheme function.
 *
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 *
 * @typedef {Object} Theme
 * @property {string} name - The name of the theme.
 *
 * @typedef {Object} ThemeContextValue
 * @property {Theme} theme - The current theme object.
 * @property {function(string): void} changeTheme - Function to change the theme.
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({ ...githubTheme, name: 'github' }); // Ensure theme has a name property

  const changeTheme = (themeName) => {
    switch (themeName) {
      case 'dark':
        setTheme({ ...darkTheme, name: 'dark' });
        break;
      case 'light':
        setTheme({ ...lightTheme, name: 'light' });
        break;
      case 'twitter':
        setTheme({ ...twitterTheme, name: 'twitter' });
        break;
      case 'facebook':
        setTheme({ ...facebookTheme, name: 'facebook' });
        break;
      case 'github':
        setTheme({ ...githubTheme, name: 'github' });
        break;
      default:
        setTheme({ ...githubTheme, name: 'github' });
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => useContext(ThemeContext); // Ensure correct export

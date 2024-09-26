import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

/**
 * Custom hook to access the ThemeContext.
 *
 * @returns {Object} The current theme context value.
 */
const useThemeContext = () => useContext(ThemeContext);

export default useThemeContext;

import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const useThemeContext = () => useContext(ThemeContext);

export default useThemeContext;
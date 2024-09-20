import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostPage from "./components/Postpage";
import FindQuestionPage from "./components/FindQuestionpage";
import HomePage from "./components/home/HomePage";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import SignOut from "./components/auth/SignOut";
import {CssBaseline, ThemeProvider} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import {darkTheme, lightTheme} from "./theme/theme";
import PrivateRoute from "./components/auth/PrivateRoute";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/post-something" element={<PrivateRoute><PostPage /></PrivateRoute>} />
          <Route path="/find-questions" element={<PrivateRoute><FindQuestionPage /></PrivateRoute>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

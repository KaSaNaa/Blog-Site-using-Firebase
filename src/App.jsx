import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import {darkTheme, lightTheme} from "./theme/theme";
import PrivateRoute from "./components/auth/PrivateRoute";
import { lazy, Suspense } from "react";

const lazyImport = (path) => lazy(() => import(`${path}`));

const SignUp = lazyImport("./components/auth/SignUp");
const PostPage = lazyImport("./components/Postpage");
const FindQuestionPage = lazyImport("./components/FindQuestionpage");
const HomePage = lazyImport("./components/home/HomePage");
const SignIn = lazyImport("./components/auth/SignIn");
const SignOut = lazyImport("./components/auth/SignOut");

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/post-something" element={<PrivateRoute><PostPage /></PrivateRoute>} />
          <Route path="/find-questions" element={<PrivateRoute><FindQuestionPage /></PrivateRoute>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;

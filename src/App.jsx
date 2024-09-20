import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import {darkTheme, lightTheme} from "./theme/theme";
import PrivateRoute from "./components/auth/PrivateRoute";
import { lazy, Suspense } from "react";
import { Oval } from "react-loader-spinner";

const SignUp = lazy(() => import("./components/auth/SignUp"));
const PostPage = lazy(() => import("./components/Postpage"));
const FindQuestionPage = lazy(() => import("./components/FindQuestionpage"));
const HomePage = lazy(() => import("./components/home/HomePage"));
const SignIn = lazy(() => import("./components/auth/SignIn"));
const SignOut = lazy(() => import("./components/auth/SignOut"));

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
      <Suspense fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Oval
            height={80}
            width={80}
            color="lightblue"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="grey"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      }>
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

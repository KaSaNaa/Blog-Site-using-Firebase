import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import {darkTheme, greenTheme, lightTheme, redTheme} from "./theme/theme";
import PrivateRoute from "./components/auth/PrivateRoute";
import { lazy, Suspense } from "react";
import Spinner from "./components/misc/Spinner";
import ArticleView from "./components/posts/ArticleView";

const SignUp = lazy(() => import("./components/auth/SignUp"));
const PostPage = lazy(() => import("./components/posts/Postpage"));
const FindQuestionPage = lazy(() => import("./components/posts/FindQuestionpage"));
const HomePage = lazy(() => import("./components/home/HomePage"));
const SignIn = lazy(() => import("./components/auth/SignIn"));
const SignOut = lazy(() => import("./components/auth/SignOut"));

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
      <Suspense fallback={
        <Spinner color="#4fa94d" text="Dev@Deakin is loading..." />
      }>
        <Routes>
          <Route path="/post-something" element={<PrivateRoute><PostPage /></PrivateRoute>} />
          <Route path="/find-questions" element={<PrivateRoute><FindQuestionPage /></PrivateRoute>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:articleId" element={<ArticleView />} />
        </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;

// TODO: Make the chatbot
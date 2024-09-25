import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import PrivateRoute from "./components/auth/PrivateRoute";
import { lazy, Suspense } from "react";
import Spinner from "./components/misc/Spinner";
import ArticleView from "./components/posts/ArticleView";
import { ThemeProvider as CustomThemeProvider } from "./contexts/ThemeContext"; // Fix typo
import useThemeContext from "./hooks/useTheme";

const SignUp = lazy(() => import("./components/auth/SignUp"));
const PostPage = lazy(() => import("./components/posts/Postpage"));
const FindQuestionPage = lazy(() => import("./components/posts/FindQuestionpage"));
const HomePage = lazy(() => import("./components/home/HomePage"));
const SignIn = lazy(() => import("./components/auth/SignIn"));
const SignOut = lazy(() => import("./components/auth/SignOut"));

function App() {
  const { theme } = useThemeContext();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<Spinner color="#4fa94d" text="Dev@Deakin is loading..." />}>
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

export default function AppWrapper() {
  return (
    <CustomThemeProvider> {/* Fix typo */}
      <App />
    </CustomThemeProvider>
  );
}
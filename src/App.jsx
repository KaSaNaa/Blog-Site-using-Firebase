import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

import PrivateRoute from './components/auth/PrivateRoute';
import { lazy, Suspense } from 'react';
import Spinner from './components/misc/Spinner';
import ArticleView from './components/posts/ArticleView';
import { ThemeProvider as CustomThemeProvider } from './contexts/ThemeContext';
import useThemeContext from './hooks/useTheme';
import GlobalLayout from './GlobalLayout';
import { LoadingProvider, useLoading } from './contexts/LoadingContext';
import FeaturedArticles from './components/home/Articles';
import SubscriptionPage from './components/subscriptions/SubscriptionPage';

const SignUp = lazy(() => import('./components/auth/SignUp'));
const PostPage = lazy(() => import('./components/posts/Postpage'));
const FindQuestionPage = lazy(
  () => import('./components/posts/FindQuestionpage')
);
const HomePage = lazy(() => import('./components/home/HomePage'));
const SignIn = lazy(() => import('./components/auth/SignIn'));
const SignOut = lazy(() => import('./components/auth/SignOut'));

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 },
};

function App() {
  const { theme } = useThemeContext();
  const location = useLocation();
  const { isLoading } = useLoading(); // Use loading state

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoading && <Spinner />} {/* Show spinner when loading */}
      <AnimatePresence mode="wait">
        <Suspense
          fallback={<Spinner color="#4fa94d" text="Dev@Deakin is loading..." />}
        >
          <Routes location={location} key={location.pathname}>
            <Route element={<GlobalLayout />}>
              <Route
                path="/post-something"
                element={
                  <motion.div {...pageTransition}>
                    <PrivateRoute>
                      <PostPage />
                    </PrivateRoute>
                  </motion.div>
                }
              />
              <Route
                path="/show-articles"
                element={
                  <motion.div {...pageTransition}>
                    <PrivateRoute>
                      <FeaturedArticles />
                    </PrivateRoute>
                  </motion.div>
                }
              />
              <Route
                path="/find-questions"
                element={
                  <motion.div {...pageTransition}>
                    <PrivateRoute>
                      <FindQuestionPage />
                    </PrivateRoute>
                  </motion.div>
                }
              />
              <Route
                path="/signin"
                element={
                  <motion.div {...pageTransition}>
                    <SignIn />
                  </motion.div>
                }
              />
              <Route
                path="/signup"
                element={
                  <motion.div {...pageTransition}>
                    <SignUp />
                  </motion.div>
                }
              />
              <Route
                path="/signout"
                element={
                  <motion.div {...pageTransition}>
                    <SignOut />
                  </motion.div>
                }
              />
              <Route
                path="*"
                element={
                  <motion.div {...pageTransition}>
                    <HomePage />
                  </motion.div>
                }
              />
              <Route
                path="/article/:articleId"
                element={
                  <motion.div {...pageTransition}>
                    <ArticleView />
                  </motion.div>
                }
              />
              <Route
                path="/subscription"
                element={
                  <motion.div {...pageTransition}>
                    <SubscriptionPage />
                  </motion.div>
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default function AppWrapper() {
  return (
    <CustomThemeProvider>
      <LoadingProvider>
        <Router>
          <App />
        </Router>
      </LoadingProvider>
    </CustomThemeProvider>
  );
}

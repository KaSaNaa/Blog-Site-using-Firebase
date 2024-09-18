import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostPage from "./components/Postpage";
import FindQuestionPage from "./components/FindQuestionpage";
import HomePage from "./components/home/HomePage";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import SignOut from "./components/auth/SignOut";
import { handleGoogleSignIn, handleGithubSignIn, handleEmailSignIn } from "./services/authService";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/post-something" element={<PostPage />} />
        <Route path="/find-questions" element={<FindQuestionPage />} />
        <Route path="/signin" element={<SignIn handleEmailSignIn={handleEmailSignIn} handleGoogleSignIn={handleGoogleSignIn} handleGithubSignIn={handleGithubSignIn} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostPage from "./components/Postpage";
import FindQuestionPage from "./components/FindQuestionpage";
import LoginPage from "./components/auth/Login";
import SignUpPage from "./components/auth/Signup";
import LoginSuccess from "./components/auth/LoginSuccess";
import HomePage from "./components/home/homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/post-something" element={<PostPage />} />
        <Route path="/find-questions" element={<FindQuestionPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<LoginSuccess />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;

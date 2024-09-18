import { auth, googleProvider, githubProvider } from "../configs/firebaseConfigs";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export const handleGoogleSignIn = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    alert("Signed in with Google");
  } catch (error) {
    console.error("Error signing in with Google:", error);
    alert("Error signing in with Google");
  }
};

export const handleGithubSignIn = async () => {
  try {
    await signInWithPopup(auth, githubProvider);
    alert("Signed in with GitHub");
  } catch (error) {
    console.error("Error signing in with GitHub:", error);
    alert("Error signing in with GitHub");
  }
};

export const handleEmailSignIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Signed in with Email");
  } catch (error) {
    console.error("Error signing in with Email:", error);
    alert("Error signing in with Email");
  }
};

export const handleEmailSignUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signed up with Email");
    } catch (error) {
      console.error("Error signing up with Email:", error);
      alert("Error signing up with Email");
    }
  };
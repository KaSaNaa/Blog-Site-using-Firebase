import { useContext } from 'react';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import {
  auth,
  googleProvider,
  githubProvider,
} from '../../configs/firebaseConfigs';
import { AuthContext } from '../../contexts/AuthContext';

const useAuth = () => {
  const { setUser } = useContext(AuthContext);

  const handleGoogleSignIn = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);

      alert('Signed in with Google');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      alert('Error signing in with Google');
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const result = await signInWithPopup(auth, githubProvider);
      setUser(result.user);
      alert('Signed in with GitHub');
    } catch (error) {
      console.error('Error signing in with GitHub:', error);
      alert('Error signing in with GitHub');
    }
  };

  const handleEmailSignIn = async (email, password) => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      alert('Signed in with Email');
    } catch (error) {
      console.error('Error signing in with Email:', error);
      alert('Error signing in with Email');
    }
  };

  const handleEmailSignUp = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(result.user);
      alert('Signed up with Email');
    } catch (error) {
      console.error('Error signing up with Email:', error);
      alert('Error signing up with Email');
    }
  };

  return {
    handleGoogleSignIn,
    handleGithubSignIn,
    handleEmailSignIn,
    handleEmailSignUp,
  };
};

export default useAuth;

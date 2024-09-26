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

/**
 * Custom hook for handling authentication using various providers.
 *
 * @returns {Object} An object containing authentication handler functions.
 * @returns {Function} handleGoogleSignIn - Function to handle sign-in with Google.
 * @returns {Function} handleGithubSignIn - Function to handle sign-in with GitHub.
 * @returns {Function} handleEmailSignIn - Function to handle sign-in with Email and Password.
 * @returns {Function} handleEmailSignUp - Function to handle sign-up with Email and Password.
 */
/**
 * Custom hook for handling user authentication.
 *
 * This hook provides methods for signing in and signing up users using various authentication providers
 * such as Google, GitHub, and Email/Password. It leverages Firebase authentication and context to manage
 * user state within the application.
 *
 * @returns {Object} An object containing the following methods:
 * 
 * @method handleGoogleSignIn
 * Initiates the sign-in process using Google as the authentication provider.
 * Sets the authentication persistence to browser session.
 * On successful sign-in, updates the user context with the authenticated user.
 * Displays an alert indicating successful sign-in.
 * Logs and alerts any errors encountered during the sign-in process.
 * 
 * @method handleGithubSignIn
 * Initiates the sign-in process using GitHub as the authentication provider.
 * Sets the authentication persistence to browser session.
 * On successful sign-in, updates the user context with the authenticated user.
 * Displays an alert indicating successful sign-in.
 * Logs and alerts any errors encountered during the sign-in process.
 * 
 * @method handleEmailSignIn
 * Initiates the sign-in process using Email and Password as the authentication method.
 * Sets the authentication persistence to browser session.
 * On successful sign-in, updates the user context with the authenticated user.
 * Displays an alert indicating successful sign-in.
 * Logs and alerts any errors encountered during the sign-in process.
 * 
 * @param {string} email - The email address of the user attempting to sign in.
 * @param {string} password - The password of the user attempting to sign in.
 * 
 * @method handleEmailSignUp
 * Initiates the sign-up process using Email and Password as the authentication method.
 * On successful sign-up, updates the user context with the authenticated user.
 * Displays an alert indicating successful sign-up.
 * Logs and alerts any errors encountered during the sign-up process.
 * 
 * @param {string} email - The email address of the user attempting to sign up.
 * @param {string} password - The password of the user attempting to sign up.
 */
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

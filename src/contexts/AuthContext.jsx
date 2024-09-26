import { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configs/firebaseConfigs';

export const AuthContext = createContext();

/**
 * AuthProvider component that provides authentication context to its children.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components that will receive the authentication context.
 *
 * @returns {JSX.Element} The AuthContext provider with user state.
 *
 * @example
 * <AuthProvider>
 *   <YourComponent />
 * </AuthProvider>
 *
 * @description
 * This component initializes the user state from a Firebase key stored in sessionStorage.
 * It also sets up an effect to listen for authentication state changes using Firebase's onAuthStateChanged.
 * The user state and setUser function are provided to the context consumers.
 */
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  // Initialize user state from Firebase key in sessionStorage
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem(
      'firebase:authUser:AIzaSyCbj5GPq-JQ12AJSeB8WBkTavwv8-xz4WU:[DEFAULT]'
    );
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

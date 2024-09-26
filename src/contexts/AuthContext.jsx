import { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configs/firebaseConfigs';

export const AuthContext = createContext();

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

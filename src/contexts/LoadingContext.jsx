/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from 'react';

const LoadingContext = createContext();

/**
 * Provides a context for managing loading state.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The provider component that supplies loading state and its updater function.
 */
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

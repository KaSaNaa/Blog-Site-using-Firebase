import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  return user ? children : <Navigate to="/signin" />;
};

/**
 * A higher-order component that wraps around a route component to ensure
 * that the user is authenticated before accessing the route.
 *
 * @component
 * @example
 * // Usage example:
 * <PrivateRoute path="/dashboard" component={Dashboard} />
 *
 * @param {Object} props - The properties passed to the component.
 * @param {React.ComponentType} props.component - The component to render if the user is authenticated.
 * @param {Object} props.rest - The rest of the properties to pass to the route.
 * @returns {JSX.Element} - A route component that renders the given component if authenticated, otherwise redirects to login.
 */
export default PrivateRoute;

import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const PublicRoute = ({ element: Component, redirectTo = '/' }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
};

PublicRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  redirectTo: PropTypes.string,
};

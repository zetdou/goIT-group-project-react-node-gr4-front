import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const PublicRoute = ({
  element: Component,
  redirectTo = '/dashboard',
}) => {
  const { isLoggedIn, accessToken, refreshToken } = useAuth();
  const location = useLocation();

  const persistedAuth = localStorage.getItem('persist:auth');
  const hasValidAuth = persistedAuth && JSON.parse(persistedAuth).accessToken;

  const shouldRedirect =
    isLoggedIn && accessToken && refreshToken && hasValidAuth;

  return shouldRedirect ? (
    <Navigate to={location.state?.from || redirectTo} replace />
  ) : (
    <Component />
  );
};

PublicRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  redirectTo: PropTypes.string,
};

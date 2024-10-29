import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const PrivateRoute = ({ element: Component, redirectTo = '/' }) => {
  const { isLoggedIn, isRefreshing, accessToken, refreshToken } = useAuth();

  const persistedAuth = localStorage.getItem('persist:auth');
  const hasValidAuth = persistedAuth && JSON.parse(persistedAuth).accessToken;

  if (isRefreshing) {
    return null;
  }

  const shouldRedirect =
    !isLoggedIn || (!accessToken && !refreshToken) || !hasValidAuth;

  return shouldRedirect ? (
    <Navigate
      to={redirectTo}
      replace
      state={{ from: window.location.pathname }}
    />
  ) : (
    <Component />
  );
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  redirectTo: PropTypes.string,
};

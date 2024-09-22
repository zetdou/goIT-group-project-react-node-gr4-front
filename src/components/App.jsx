import { useEffect, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { PrivateRoute } from './PrivateRoute';
// import { RestrictedRoute } from './RestrictedRoute';
import { Layout } from './Layout/Layout';
import { refreshUser } from '../redux/operations/auth';
import { useAuth } from '../hooks/useAuth';
import { Loader } from './Loader/Loader';
import { NotFound } from '../pages/NotFound/NotFound';

// import pages like this
const HomeLoggedOut = lazy(() =>
  import('../pages/HomeLoggedOut/HomeLoggedOut')
);
const HomeLoggedIn = lazy(() => import('../pages/HomeLoggedIn/HomeLoggedIn'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing, isLoggedIn } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      {isRefreshing ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={isLoggedIn ? <HomeLoggedIn /> : <HomeLoggedOut />}
            />
            {/* <Route
              path="register"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<Register />}
                />
              }
            />
            <Route
              path="login"
              element={
                <RestrictedRoute redirectTo="/contacts" component={<Login />} />
              }
            />
            <Route
              path="contacts"
              element={
                <PrivateRoute redirectTo="/login" component={<Contacts />} />
              }
            /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
};

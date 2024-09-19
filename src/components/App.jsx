import { useEffect, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { PrivateRoute } from './PrivateRoute';
// import { RestrictedRoute } from './RestrictedRoute';
// import { Layout } from './Layout/Layout';
import { refreshUser } from '../redux/operations/auth';
import { useAuth } from '../hooks/useAuth';

// import pages like this
// const Home = lazy(() => import('../pages/Home/Home'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <div>
      <Routes></Routes>
    </div>
  );
};

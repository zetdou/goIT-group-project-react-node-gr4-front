import { useEffect, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PrivateRoute } from './Route/PrivateRoute';
import { PublicRoute } from './Route/PublicRoute';
import { SharedLayout } from './Layout/SharedLayout';
import { refreshUser } from '../redux/Users/AuthOperations';
import { useAuth } from '../hooks/useAuth';
import { Loader } from './Loader/Loader';
import { NotFound } from '../pages/NotFound/NotFound';

// import pages like this
const HomeLoggedOut = lazy(() =>
  import('../pages/HomeLoggedOut/HomeLoggedOut')
);
// const HomeLoggedIn = lazy(() => import('../pages/HomeLoggedIn/HomeLoggedIn'));
const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));
const TransactionPage = lazy(() =>
  import('../pages/Transactions/Transactions')
);
const Expenses = lazy(() => import('./Expenses/Expenses'));
const Incomes = lazy(() => import('./Incomes/Incomes'));
const ReportsPage = lazy(() => import('../pages/Report/Report'));

export const App = () => {
  const dispatch = useDispatch();
  const {
    isRefreshing,
    // isLoggedIn
  } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      {isRefreshing ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            {/* <Route
              index
              element={
                <PublicRoute
                  element={isLoggedIn ? <HomeLoggedIn /> : <HomeLoggedOut />}
                />
              }
            /> */}
            <Route index element={<PublicRoute element={HomeLoggedOut} />} />
            <Route
              path="/register"
              element={<PublicRoute element={RegisterPage} />}
            />
            <Route
              path="/transactions"
              element={<PrivateRoute element={TransactionPage} />}
            >
              <Route path="expenses" element={<Expenses />} />
              <Route path="incomes" element={<Incomes />} />
            </Route>
            <Route
              path="/reports"
              element={<PrivateRoute element={ReportsPage} />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
};

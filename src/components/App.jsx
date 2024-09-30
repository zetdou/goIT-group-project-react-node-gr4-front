import { useEffect, lazy, Suspense } from 'react';
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
const Home = lazy(() => import('../pages/Home/Home'));
const TransactionPage = lazy(() =>
  import('../pages/Transactions/Transactions')
);
const Expenses = lazy(() => import('./Expenses/Expenses'));
const Incomes = lazy(() => import('./Incomes/Incomes'));
const ReportsPage = lazy(() => import('../pages/Report/ReportPage'));

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
        <>
          <Loader />
        </>
      ) : (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route
                index
                element={
                  <PublicRoute element={Home} redirectTo="/transactions" />
                }
              />
              <Route
                path="/transactions"
                element={
                  <PrivateRoute element={TransactionPage} redirectTo="/" />
                }
              >
                <Route
                  path="expenses"
                  element={<PrivateRoute element={Expenses} redirectTo="/" />}
                />
                <Route
                  path="incomes"
                  element={<PrivateRoute element={Incomes} redirectTo="/" />}
                />
              </Route>
              <Route
                path="/reports"
                element={<PrivateRoute element={ReportsPage} redirectTo="/" />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      )}
    </>
  );
};

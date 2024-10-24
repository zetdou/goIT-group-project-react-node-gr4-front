import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './Route/PrivateRoute';
import { PublicRoute } from './Route/PublicRoute';
import { SharedLayout } from './Layout/SharedLayout';
import { useAuth } from '../hooks/useAuth';
import { Loader } from './Loader/Loader';
import { NotFound } from '../pages/NotFound/NotFound';

const Home = lazy(() => import('../pages/Home/Home'));
const TransactionPage = lazy(() =>
  import('../pages/Transactions/Transactions')
);
const Expenses = lazy(() => import('./Expenses/Expenses'));
const Incomes = lazy(() => import('./Incomes/Incomes'));
const ReportsPage = lazy(() => import('../pages/Report/ReportPage'));

export const App = () => {
  const { isRefreshing } = useAuth();

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

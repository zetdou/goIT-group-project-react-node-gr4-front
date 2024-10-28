import React, { useState, useEffect, useCallback, useRef } from 'react';

import { getTransactionsData } from '../../redux/Report/ReportOperations';

import Balance from '../../components/Balance/Balance';
import CurrentPeriod from '../../components/CurrentPeriod/CurrentPeriod';
import CategoryList from '../../components/CategoryList/CategoryList';
import ReturnToMainPage from '../../components/ReturnToMainPage/ReturnToMainPage';
import BalanceLabel from '../../components/BalanceLabel/BalanceLabel';
import ReportsCategoriesNavigation from '../../components/ReportsCategoriesNavigation/ReportsCategoriesNavigation';
import ReportsChart from '../../components/ReportsChart/ReportsChart';
import { useDispatch, useSelector } from 'react-redux';
import {
  expenses,
  incomes,
  loadingReports,
} from '../../redux/Report/ReportSelectors';

const ReportsPage = () => {
  const dispatch = useDispatch();
  const fetchTimeoutRef = useRef(null);

  const [currentPeriod, setCurrentPeriod] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      '0'
    )}`;
  });

  const expensesData = useSelector(expenses);
  const incomesData = useSelector(incomes);
  const isLoading = useSelector(loadingReports);

  const [currentView, setCurrentView] = useState('expenses');

  const toggleView = useCallback(() => {
    setCurrentView(prevView =>
      prevView === 'expenses' ? 'income' : 'expenses'
    );
  }, []);

  useEffect(() => {
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }

    fetchTimeoutRef.current = setTimeout(async () => {
      if (currentPeriod) {
        console.log('Fetching data for period:', currentPeriod);
        await dispatch(getTransactionsData({ period: currentPeriod }));
      }
    }, 300);

    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, [currentPeriod, dispatch]);

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div>
      <div>
        <ReturnToMainPage />
        <Balance />
        <CurrentPeriod
          currentPeriod={currentPeriod}
          setCurrentPeriod={setCurrentPeriod}
        />
      </div>
      <div>
        <BalanceLabel />
        <div>
          <div>
            <ReportsCategoriesNavigation
              currentView={currentView}
              toogleView={toggleView}
            />
            <CategoryList currentView={currentView} />
          </div>
        </div>
        <ReportsChart
          expensesData={expensesData}
          incomesData={incomesData}
          currentCategory={currentView === 'expenses' ? 'Expenses' : 'Incomes'}
        />
      </div>
    </div>
  );
};

export default ReportsPage;

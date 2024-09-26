import React, { useState, useEffect } from 'react';

import { getTransactionsData } from '../../redux/Report/ReportOperations';

import Balance from '../../components/Balance/Balance';
import CurrentPeriod from '../../components/CurrentPeriod/CurrentPeriod';
import CategoryList from '../../components/CategoryList/CategoryList';
import ReturnToMainPage from '../../components/ReturnToMainPage/ReturnToMainPage';
import BalanceLabel from '../../components/BalanceLabel/BalanceLabel';
import ReportsCategoriesNavigation from '../../components/ReportsCategoriesNavigation/ReportsCategoriesNavigation';
import ReportsChart from '../../components/ReportsChart/ReportsChart';
import { useDispatch, useSelector } from 'react-redux';
import { expenses, incomes } from '../../redux/Report/ReportSelectors';

const ReportsPage = () => {
  const dispatch = useDispatch();

  const [currentPeriod, setCurrentPeriod] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      '0'
    )}`;
  });

  const expensesData = useSelector(expenses);
  const incomesData = useSelector(incomes);

  const [currentView, setCurrentView] = useState('expenses');

  const toggleView = () => {
    setCurrentView(prevView =>
      prevView === 'expenses' ? 'income' : 'expenses'
    );
  };

  useEffect(() => {
    dispatch(getTransactionsData({ period: currentPeriod }));
  }, [dispatch, currentPeriod]);

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

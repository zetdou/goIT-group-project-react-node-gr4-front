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
  // expenses,
  // incomes,
  loadingReports,
} from '../../redux/Report/ReportSelectors';
import useReport from '../../hooks/useReport';

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

  // const expensesData = useSelector(expenses);
  // const incomesData = useSelector(incomes);
  const isLoading = useSelector(loadingReports);

  const [currentView, setCurrentView] = useState('expenses');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);

  const { incomesReport, expensesReport } = useReport();

  const toggleView = useCallback(() => {
    setCurrentView(prevView => {
      const newView = prevView === 'expenses' ? 'income' : 'expenses';
      return newView;
    });
  }, []);

  const handleCategorySelect = (category, details) => {
    setSelectedCategory(category);
    setSelectedCategoryData(details);
  };

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

  useEffect(() => {
    const currentData =
      currentView === 'expenses' ? expensesReport.data : incomesReport.data;

    if (currentData && Object.keys(currentData).length > 0) {
      const firstCategory = Object.keys(currentData)[0];
      const categoryDetails = currentData[firstCategory];

      setSelectedCategory(firstCategory);
      setSelectedCategoryData(categoryDetails);
    }
  }, [currentView, expensesReport.data, incomesReport.data]);

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
              toggleView={toggleView}
            />
            <CategoryList
              currentView={currentView}
              onCategorySelect={handleCategorySelect}
            />
          </div>
        </div>
        <ReportsChart
          selectedCategory={selectedCategory}
          categoryData={selectedCategoryData}
          currentView={currentView}
        />
      </div>
    </div>
  );
};

export default ReportsPage;

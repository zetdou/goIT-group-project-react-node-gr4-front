import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Balance from '../../components/Balance/Balance'
import Expenses from '../../components/Expenses/Expenses';
import Income from '../../components/Incomes/Incomes';
import { useNavigate } from 'react-router-dom';
import css from './Trasactions.module.css'

const App = () => {
  const [activeTab, setActiveTab] = useState('expenses');
  const navigate = useNavigate();

  return (
    <div className={css.appContainer}>
      {/* <div> */}
        <Balance />
      {/* </div> */}
      <div className={css.mainContent}>
        {activeTab === 'expenses' ? <Expenses /> : <Income />}
      </div>

      <button onClick={()=>navigate('/reports')}>Reports</button>

      <footer className={css.tabsFooter}>
        <button
          className={activeTab === 'expenses' ? `${css.tabButton} ${css.active}` : css.tabButton}
          onClick={() => setActiveTab('expenses')}
        >
          EXPENSES
        </button>
        <button
          className={activeTab === 'income' ? `${css.tabButton} ${css.active}` : css.tabButton}
          onClick={() => setActiveTab('income')}
        >
          INCOME
        </button>
      </footer>
      {/* <Outlet /> */}
    </div>
  );
};

export default App;

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../redux/Tools/axiosConfig';
import IncomeItem from '../IncomesItem/IncomesItem';
import css from './Incomes.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchCurrentUser } from '../../redux/Users/AuthOperations';

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [monthStats, setMonthStats] = useState({});
  const [newIncome, setNewIncome] = useState({
    date: new Date(),
    description: '',
    category: '',
    sum: '',
  });

  const isInitialMount = useRef(true);

  const dispatch = useDispatch();
  const isRefreshing = useSelector(state => state.auth.isRefreshing);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/transaction/income');
      setIncomes(response.data.incomes);
      setMonthStats(response.data.monthStats);
    } catch (error) {
      console.error('Błąd podczas pobierania transakcji:', error);
    }
  }, []);

  const fetchIncomeCategories = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        '/transaction/income-categories'
      );
      console.log('Income categories:', response.data);
      setIncomeCategories(response.data);
    } catch (error) {
      console.error('Błąd podczas pobierania kategorii przychodów:', error);
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchTransactions();
      fetchIncomeCategories();
    }
  }, [fetchTransactions, fetchIncomeCategories]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewIncome({ ...newIncome, [name]: value });
  };

  const addIncome = async () => {
    try {
      const formattedIncome = {
        description: newIncome.description,
        amount: parseFloat(newIncome.sum),
        date: newIncome.date.toISOString(),
        category: [newIncome.category],
      };

      await axiosInstance.post('/transaction/income', formattedIncome);
      await dispatch(fetchCurrentUser()).unwrap();
      fetchTransactions();

      setNewIncome({
        date: new Date(),
        description: '',
        category: '',
        sum: '',
      });
    } catch (error) {
      console.error(
        'Błąd podczas dodawania przychodu:',
        error.response?.data || error.message
      );
    }
  };

  const deleteIncome = async (transactionId, index) => {
    try {
      await axiosInstance.delete(`/transaction/${transactionId}`);
      await dispatch(fetchCurrentUser()).unwrap();

      const updatedIncomes = incomes.filter((_, i) => i !== index);
      setIncomes(updatedIncomes);

      fetchTransactions();
    } catch (error) {
      console.error(
        'Błąd podczas usuwania przychodu:',
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className={css.transactionContainer}>
      <div className={css.transactionHeader}>
        <div className={css.datePicker}>
          <DatePicker
            selected={newIncome.date}
            onChange={date => setNewIncome({ ...newIncome, date })}
            dateFormat="yyyy/MM/dd"
            className={css.dateInput}
            showPopperArrow={false}
          />
          <button className={css.calendarButton}>
            <svg className={css.calendarIcon}></svg>
          </button>
        </div>
        <div className={css.inputFields}>
          <input
            type="text"
            placeholder="Income description"
            name="description"
            value={newIncome.description}
            onChange={handleInputChange}
          />
          <select
            name="category"
            value={newIncome.category}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select income category
            </option>
            {Array.isArray(incomeCategories) && incomeCategories.length > 0 ? (
              incomeCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Loading categories...
              </option>
            )}
          </select>
          <input
            type="number"
            placeholder="0.00 USD"
            name="sum"
            value={newIncome.sum}
            onChange={handleInputChange}
          />
        </div>
        <div className={css.transactionButtons}>
          <button
            className={css.inputBtn}
            onClick={addIncome}
            disabled={isRefreshing}
          >
            {isRefreshing ? 'Updating...' : 'INPUT'}
          </button>
          <button
            className={css.clearBtn}
            onClick={() =>
              setNewIncome({
                date: new Date(),
                description: '',
                category: '',
                sum: '',
              })
            }
            disabled={isRefreshing}
          >
            CLEAR
          </button>
        </div>
      </div>

      <div className={css.transactionTable}>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Sum</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((income, index) => (
              <IncomeItem
                key={income._id}
                date={income.date}
                description={income.description}
                category={income.category.join(', ')}
                sum={income.amount}
                onDelete={() => deleteIncome(income._id, index)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {Object.keys(monthStats).some(month => monthStats[month] !== 'N/A') && (
        <div className={css.monthStats}>
          <h3>Month Stats</h3>
          <ul>
            {Object.keys(monthStats)
              .filter(month => monthStats[month] !== 'N/A')
              .map(month => (
                <li key={month}>
                  {month}: {monthStats[month]}
                </li>
              ))}
          </ul>
        </div>
      )}
      {isRefreshing && <div className={css.loader}>Loading...</div>}
    </div>
  );
};

export default Income;

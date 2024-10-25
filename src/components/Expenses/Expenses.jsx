import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../redux/Tools/axiosConfig';
import ExpenseItem from '../ExpensesItem/ExpensesItem';
import css from './Expenses.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchCurrentUser } from '../../redux/Users/AuthOperations';

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [monthStats, setMonthStats] = useState({});
  const [newExpense, setNewExpense] = useState({
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
      const response = await axiosInstance.get('/transaction/expense');
      setExpenses(response.data.expenses);
      setMonthStats(response.data.monthStats);
    } catch (error) {
      console.error(
        'Błąd podczas pobierania transakcji wydatków:',
        error.response?.data || error.message
      );
      console.error('Status:', error.response?.status);
      console.error('Headers:', error.response?.headers);
    }
  }, []);

  const fetchExpenseCategories = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        '/transaction/expense-categories'
      );
      setExpenseCategories(response.data);
    } catch (error) {
      console.error('Błąd podczas pobierania kategorii wydatków:', error);
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchTransactions();
      fetchExpenseCategories();
    }
  }, [fetchTransactions, fetchExpenseCategories]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const addExpense = async () => {
    try {
      const formattedExpense = {
        description: newExpense.description,
        amount: parseFloat(newExpense.sum),
        date: newExpense.date.toISOString(),
        category: [newExpense.category],
      };

      await axiosInstance.post('/transaction/expense', formattedExpense);
      await dispatch(fetchCurrentUser()).unwrap();
      fetchTransactions();

      setNewExpense({
        date: new Date(),
        description: '',
        category: '',
        sum: '',
      });
    } catch (error) {
      console.error(
        'Błąd podczas dodawania wydatku:',
        error.response?.data || error.message
      );
    }
  };

  const deleteExpense = async (transactionId, index) => {
    try {
      await axiosInstance.delete(`/transaction/${transactionId}`);
      await dispatch(fetchCurrentUser()).unwrap();

      const updatedExpenses = expenses.filter((_, i) => i !== index);
      setExpenses(updatedExpenses);

      fetchTransactions();
    } catch (error) {
      console.error(
        'Błąd podczas usuwania wydatku:',
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className={css.transactionContainer}>
      <div className={css.transactionHeader}>
        <div className={css.datePicker}>
          <DatePicker
            selected={newExpense.date}
            onChange={date => setNewExpense({ ...newExpense, date })}
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
            placeholder="Expense description"
            name="description"
            value={newExpense.description}
            onChange={handleInputChange}
          />
          <select
            name="category"
            value={newExpense.category}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select expense category
            </option>
            {Array.isArray(expenseCategories) &&
            expenseCategories.length > 0 ? (
              expenseCategories.map((category, index) => (
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
            value={newExpense.sum}
            onChange={handleInputChange}
          />
        </div>
        <div className={css.transactionButtons}>
          <button
            className={css.inputBtn}
            onClick={addExpense}
            disabled={isRefreshing}
          >
            {isRefreshing ? 'Updating...' : 'INPUT'}
          </button>
          <button
            className={css.clearBtn}
            onClick={() =>
              setNewExpense({
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
            {expenses.map((expense, index) => (
              <ExpenseItem
                key={expense._id}
                date={expense.date}
                description={expense.description}
                category={expense.category.join(', ')}
                sum={expense.amount}
                onDelete={() => deleteExpense(expense._id, index)}
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

export default Expense;

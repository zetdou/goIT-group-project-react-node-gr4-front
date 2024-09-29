import React, { useState } from 'react';
import ExpensesItem from '../ExpensesItem/ExpensesItem'
import css from './Expenses.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    date: new Date(),
    description: '',
    category: '',
    sum: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleDateChange = (date) => {
    setNewExpense({ ...newExpense, date });
  };

  const addExpense = () => {
    setExpenses([...expenses, newExpense]);
    setNewExpense({
      date: new Date(),
      description: '',
      category: '',
      sum: ''
    });
  };

  const handleDelete = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  return (
    <div className={css.transactionContainer}>
      <div className={css.transactionHeader}>
        <div className={css.datePicker}>
          <DatePicker
            selected={newExpense.date}
            onChange={handleDateChange}
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
            placeholder="Product description"
            name="description"
            value={newExpense.description}
            onChange={handleInputChange}
          />
          <select
            name="category"
            value={newExpense.category}
            onChange={handleInputChange}
          >
            {/* Kategorie 
            <option value="">Product category</option>
            <option value="Transport">Transport</option>
            <option value="Food">Food</option> */}
          </select>
          <input
            type="number"
            placeholder="0.00 ZŁ"
            name="sum"
            value={newExpense.sum}
            onChange={handleInputChange}
          />
        </div>
        <div className={css.transactionButtons}>
          <button className={css.inputBtn} onClick={addExpense}>INPUT</button>
          <button className={css.clearBtn} onClick={() => setNewExpense({
            date: new Date(),
            description: '',
            category: '',
            sum: ''
          })}>CLEAR</button>
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
              <ExpensesItem
                key={index}
                date={expense.date.toLocaleDateString()}
                description={expense.description}
                category={expense.category}
                sum={expense.sum}
                onDelete={() => handleDelete(index)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expenses;
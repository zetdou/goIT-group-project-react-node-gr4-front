import React, { useState } from 'react';
import IncomeItem from '../IncomesItem/IncomesItem';
import css from './Incomes.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [newIncome, setNewIncome] = useState({
    date: new Date(),
    description: '',
    category: '',
    sum: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIncome({ ...newIncome, [name]: value });
  };

  const handleDateChange = (date) => {
    setNewIncome({ ...newIncome, date });
  };

  const addIncome = () => {
    setIncomes([...incomes, newIncome]);
    setNewIncome({
      date: new Date(),
      description: '',
      category: '',
      sum: ''
    });
  };

  const handleDelete = (index) => {
    const newIncomes = incomes.filter((_, i) => i !== index);
    setIncomes(newIncomes);
  };

  return (
    <div className={css.transactionContainer}>
      <div className={css.transactionHeader}>
        <div className={css.datePicker}>
          <DatePicker
            selected={newIncome.date}
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
            {/* Kategorie 
            <option value="">Income category</option>
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option> */}
          </select>
          <input
            type="number"
            placeholder="0.00 ZŁ"
            name="sum"
            value={newIncome.sum}
            onChange={handleInputChange}
          />
        </div>
        <div className={css.transactionButtons}>
          <button className={css.inputBtn} onClick={addIncome}>INPUT</button>
          <button className={css.clearBtn} onClick={() => setNewIncome({
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
            {incomes.map((income, index) => (
              <IncomeItem
                key={index}
                date={income.date.toLocaleDateString()}
                description={income.description}
                category={income.category}
                sum={income.sum}
                onDelete={() => handleDelete(index)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Income;
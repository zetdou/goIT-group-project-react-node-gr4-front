import React, { useState } from 'react';
import ExpensesItem from '../ExpensesItem/ExpensesItem'
import css from './ExpensesForm.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ExpensesForm = ({ newExpense, handleInputChange, handleDateChange, addExpense, clearForm }) => {
  return (
    <div className={css.transactionHeader}>
      {/* Wybór daty z react-datepicker */}
      <div className={css.datePicker}>
        <DatePicker
          selected={newExpense?.date || new Date()} // Upewnij się, że date jest zdefiniowane
          onChange={handleDateChange}
          dateFormat="yyyy/MM/dd"
          className={css.dateInput}
          showPopperArrow={false}
        />
        <button className={css.calendarButton}>
          <svg className={css.calendarIcon}></svg>
        </button>
      </div>

      {/* Pola tekstowe dla opisów, kategorii i kwoty */}
      <div className={css.inputFields}>
        <input
          type="text"
          placeholder="Product description"
          name="description"
          value={newExpense?.description || ''} // Odczytywanie wartości description
          onChange={handleInputChange}
        />
        <select
          name="category"
          value={newExpense?.category || ''} // Odczytywanie wartości category
          onChange={handleInputChange}
        >
          <option value="">Product category</option>
          <option value="Transport">Transport</option>
          <option value="Food">Food</option>
          {/* Dodaj więcej kategorii */}
        </select>
        <input
          type="number"
          placeholder="0.00 ZŁ"
          name="sum"
          value={newExpense?.sum || ''} // Odczytywanie wartości sum
          onChange={handleInputChange}
        />
      </div>

      {/* Przyciski do zatwierdzenia lub wyczyszczenia formularza */}
      <div className={css.transactionButtons}>
        <button className={css.inputBtn} onClick={addExpense}>INPUT</button>
        <button className={css.clearBtn} onClick={clearForm}>CLEAR</button>
      </div>
    </div>
  );
};

export default ExpensesForm;
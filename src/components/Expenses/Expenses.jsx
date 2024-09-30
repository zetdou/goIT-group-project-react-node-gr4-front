import React, { useState } from 'react';
import ExpensesForm from '../../components/ExpensesForm/ExpensesForm';
import ExpensesList from '../../components/ExpensesList/ExpensesList';
import css from './Expenses.module.css';

const Expenses = () => {
    // Inicjalizacja stanu newExpense
    const [newExpense, setNewExpense] = useState({
      date: new Date(),
      description: '',
      category: '',
      sum: ''
    });
  
    const [expenses, setExpenses] = useState([]);
  
    // Funkcja do aktualizacji pól formularza
    const handleInputChange = (e) => {
      console.log(`${e.target.name}: ${e.target.value}`);
      const { name, value } = e.target;
      setNewExpense({ ...newExpense, [name]: value });
    };
  
    // Funkcja do aktualizacji daty
    const handleDateChange = (date) => {
      setNewExpense({ ...newExpense, date });
    };
  
    // Dodajemy nowy wydatek do listy
    const addExpense = () => {
      setExpenses([...expenses, newExpense]);
      // Resetowanie formularza po dodaniu wydatku
      setNewExpense({
        date: new Date(),
        description: '',
        category: '',
        sum: ''
      });
    };
  
    // Funkcja do usunięcia wydatku
    const handleDelete = (index) => {
      const newExpenses = expenses.filter((_, i) => i !== index);
      setExpenses(newExpenses);
    };
  
    return (
      <div className={css.transactionContainer}>
        {/* Przekazujemy stan newExpense i funkcje jako propsy */}
        <ExpensesForm
          newExpense={newExpense}
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}
          addExpense={addExpense}
          clearForm={() => setNewExpense({
            date: new Date(),
            description: '',
            category: '',
            sum: ''
          })}
        />
        <ExpensesList expenses={expenses} handleDelete={handleDelete} />
      </div>
    );
  };
  
  export default Expenses;
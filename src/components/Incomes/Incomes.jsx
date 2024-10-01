import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IncomeItem from '../IncomesItem/IncomesItem';
import css from './Incomes.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Income = () => {
  const [incomes, setIncomes] = useState([]); // Stan dla transakcji przychodów
  const [incomeCategories, setIncomeCategories] = useState([]); // Stan dla kategorii przychodów
  const [monthStats, setMonthStats] = useState({}); // Stan dla statystyk miesięcznych
  const [newIncome, setNewIncome] = useState({
    date: new Date(),
    description: '',
    category: '',
    sum: '',
  });

  // Funkcja do pobierania transakcji przy każdym załadowaniu strony
  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/transaction/income'); // Pobierz wszystkie transakcje przychodów
      setIncomes(response.data.incomes); // Ustaw transakcje
      setMonthStats(response.data.monthStats); // Ustaw statystyki miesięczne
    } catch (error) {
      console.error('Błąd podczas pobierania transakcji:', error);
    }
  };

  // Funkcja do pobierania kategorii przychodów
  const fetchIncomeCategories = async () => {
    try {
      const response = await axios.get('/transaction/income-categories');
      console.log('Income categories:', response.data);
      setIncomeCategories(response.data);
    } catch (error) {
      console.error('Błąd podczas pobierania kategorii przychodów:', error);
    }
  };

  // Pobierz transakcje i kategorie przy pierwszym załadowaniu komponentu
  useEffect(() => {
    fetchTransactions(); // Pobierz wszystkie transakcje przychodów
    fetchIncomeCategories(); // Pobierz kategorie przychodów
  }, []);

  // Obsługa zmian w polach input
  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewIncome({ ...newIncome, [name]: value });
  };

  // Dodawanie nowej transakcji
  const addIncome = async () => {
    try {
      const formattedIncome = {
        description: newIncome.description,
        amount: parseFloat(newIncome.sum), // Upewnij się, że suma jest liczbą
        date: newIncome.date.toISOString(), // Format ISO
        category: [newIncome.category], // Kategorie w formie tablicy
      };

      console.log('Wysyłam dane do backendu:', formattedIncome);

      // Wysłanie nowej transakcji do backendu
      await axios.post('/transaction/income', formattedIncome);

      // Po dodaniu transakcji, ponownie pobierz transakcje i zaktualizuj statystyki
      fetchTransactions(); // Aktualizacja transakcji i statystyk

      // Zresetuj formularz po dodaniu transakcji
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

  // Usuwanie transakcji przychodów
  const deleteIncome = async (transactionId, index) => {
    try {
      await axios.delete(`/transaction/${transactionId}`);

      const updatedIncomes = incomes.filter((_, i) => i !== index);
      setIncomes(updatedIncomes);

      console.log('Transakcja usunięta:', transactionId);
      fetchTransactions(); // Aktualizacja statystyk po usunięciu
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
            selected={newIncome.date} // Używamy newIncome.date do wyboru daty
            onChange={date => setNewIncome({ ...newIncome, date })} // Aktualizacja daty przy dodawaniu transakcji
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
            <option value="">Select income category</option>
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
            placeholder="0.00 ZŁ"
            name="sum"
            value={newIncome.sum}
            onChange={handleInputChange}
          />
        </div>
        <div className={css.transactionButtons}>
          <button className={css.inputBtn} onClick={addIncome}>
            INPUT
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
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Statystyki miesięczne */}
      <div className={css.monthStats}>
        <h3>Month Stats</h3>
        <ul>
          {Object.keys(monthStats).map(month => (
            <li key={month}>
              {month}: {monthStats[month]}
            </li>
          ))}
        </ul>
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
                key={income._id} // Używamy identyfikatora transakcji jako klucza
                date={income.date}
                description={income.description}
                category={income.category.join(', ')} // Łączenie kategorii w string
                sum={income.amount}
                onDelete={() => deleteIncome(income._id, index)} // Przekazujemy id transakcji do usuwania
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Income;

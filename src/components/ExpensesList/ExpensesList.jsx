import React from 'react';
import ExpensesItem from '../../components/ExpensesItem/ExpensesItem';
import css from './ExpensesList.module.css'

const ExpensesList = ({ expenses, handleDelete }) => {
  return (
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
  );
};

export default ExpensesList;
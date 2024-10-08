import React from 'react';
import css from './ExpensesItem.module.css';

const ExpensesItem = ({ date, description, category, sum, onDelete }) => {
  return (
    <tr className={css.expensesItem}>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td className={css.sum}>-{Math.abs(sum)} PLN</td>
      <td>
        <button className={css.deleteButton} onClick={onDelete}>
          <svg className={css.deleteIcon}></svg>
        </button>
      </td>
    </tr>
  );
};

export default ExpensesItem;


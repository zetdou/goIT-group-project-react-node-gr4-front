import React from 'react';
import css from '../IncomesItem/IncomesItem.module.css';

const IncomeItem = ({ date, description, category, sum, onDelete }) => {
  return (
    <tr className={css.incomeItem}>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td className={css.sum}>{sum} UAH</td>
      <td>
        <button className={css.deleteButton} onClick={onDelete}>
          <svg className={css.deleteIcon}></svg>
        </button>
      </td>
    </tr>
  );
};

export default IncomeItem;
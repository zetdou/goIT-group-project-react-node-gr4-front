import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateBalance } from '../../redux/Users/AuthOperations';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import css from './Balance.module.css';

const Balance = () => {
  const dispatch = useDispatch();
  const form = useRef();
  const { user } = useAuth();
  const navigate = useNavigate();

  const userBalance = user ? parseFloat(user.balance).toFixed(2) : '0.00';

  const handleSubmit = e => {
    e.preventDefault();
    const balanceValue = parseFloat(e.target.balance.value);
    if (isNaN(balanceValue)) {
      return;
    }
    console.log('Balance to update:', balanceValue);
    dispatch(updateBalance(balanceValue));
    form.current.reset();
  };

  const handleReports = () => {
    navigate('/reports');
  };

  return (
    <div className={css.BalanceContainer}>
      <form ref={form} onSubmit={handleSubmit} className={css.BalanceForm}>
        <label className={css.BalanceLabel}>Balance</label>
        <div className={css.BalanceWrapper}>
          <input
            className={css.BalanceInput}
            type="number"
            name="balance"
            title="Please, enter your balance"
            step="0.01"
            placeholder={`${userBalance} USD`}
            required
            id="balance-input"
            // className={css.balanceInput}
          />
          <button type="submit" className={css.BalanceButton}>
            CONFIRM
          </button>
        </div>
        <button onClick={handleReports} type="button">
          reports
        </button>
      </form>
    </div>
  );
};

export default Balance;

import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { updateBalance } from '../../redux/Users/AuthOperations';
import { useAuth } from '../../hooks/useAuth';

import css from './Balance.module.css';
import BalanceModal from '../BalanceModal/BalanceModal';

const Balance = () => {
  const dispatch = useDispatch();
  const form = useRef();
  const { user } = useAuth();

  const userBalance = user ? user.balance : '0.00';

  
  const [placeholderText, setPlaceholderText] = useState(`${userBalance} USD`);

  const handleSubmit = e => {
    e.preventDefault();
    const balanceValue = e.target.balance.value;
    console.log('Balance to update:', balanceValue);
    dispatch(updateBalance(balanceValue));
    form.current.reset();
    setPlaceholderText(`${balanceValue} USD`);
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
            placeholder={placeholderText}
            required
          />
          <button type="submit" className={css.BalanceButton}>
            CONFIRM
          </button>
        </div>
      </form>
      {!userBalance && <BalanceModal />}
    </div>
  );
};

export default Balance;

import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateBalance,
  fetchCurrentUser,
} from '../../redux/Users/AuthOperations';
import { useNavigate } from 'react-router-dom';
import css from './Balance.module.css';

const Balance = () => {
  const dispatch = useDispatch();
  const form = useRef();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const isRefreshing = useSelector(state => state.auth.isRefreshing);

  const [displayBalance, setDisplayBalance] = useState('0.00');

  useEffect(() => {
    if (user && user.balance !== undefined) {
      setDisplayBalance(parseFloat(user.balance).toFixed(2));
    }
  }, [user]);

  const handleSubmit = async e => {
    e.preventDefault();
    const balanceValue = e.target.balance.value;

    // Sprawdzamy, czy wartość jest pusta lub nie jest liczbą
    if (balanceValue === '' || isNaN(parseFloat(balanceValue))) {
      console.error('Invalid balance value');
      return;
    }

    const newBalance = parseFloat(balanceValue);

    console.log('Balance to update:', newBalance);
    try {
      await dispatch(updateBalance(newBalance)).unwrap();
      await dispatch(fetchCurrentUser()).unwrap();
      form.current.reset();
    } catch (error) {
      console.error('Failed to update balance:', error);
    }
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
            placeholder={isRefreshing ? 'Updating...' : `${displayBalance} USD`}
            required
            id="balance-input"
            disabled={isRefreshing}
          />
          <button
            type="submit"
            className={css.BalanceButton}
            disabled={isRefreshing}
          >
            {isRefreshing ? 'Updating...' : 'CONFIRM'}
          </button>
        </div>
        <button onClick={handleReports} type="button" disabled={isRefreshing}>
          reports
        </button>
      </form>
      {isRefreshing && <div className={css.loader}>Loading...</div>}
    </div>
  );
};

export default Balance;

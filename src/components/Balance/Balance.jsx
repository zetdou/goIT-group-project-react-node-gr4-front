import { useRef } from 'react';
import { useDispatch } from 'react';

import { updateBalance } from '../../redux/Users/AuthOperations';

import { useAuth } from '../../hooks/useAuth';

import BalanceModal from '../BalanceModal/BalanceModal';

export const Balance = () => {
  const dispatch = useDispatch();
  const form = useRef();
  const { user } = useAuth();

  let userBalance = user.balance;
  let balanceValue;

  const handleSubmit = e => {
    e.preventDefault();
    balanceValue = e.target.balance.value;
    dispatch(updateBalance(balanceValue));
    form.current.reset();
  };

  return (
    <div>
      <form ref={form} onSubmit={handleSubmit}>
        <label>Balance</label>
        <div>
          <input
            type="number"
            name="balance"
            title="Please, enter your balance"
            value={balanceValue}
            step="0.01"
            placeholder={`${userBalance ? userBalance : '0.00'} USD`}
            required
          />
          <button type="submit">CONFIRM</button>
        </div>
      </form>
      {!userBalance && <BalanceModal />}
    </div>
  );
};

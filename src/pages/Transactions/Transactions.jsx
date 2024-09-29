import { Outlet } from 'react-router-dom';
import Balance from '../../components/Balance/Balance';

const TransactionsPage = () => {
  return (
    <div>
      <Balance />
      <Outlet />
    </div>
  );
};

export default TransactionsPage;

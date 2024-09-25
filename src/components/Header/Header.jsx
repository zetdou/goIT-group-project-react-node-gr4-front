import css from './Header.module.css';
import { useAuth } from '../../hooks/useAuth';
import { UserMenu } from '../UserMenu/UserMenu';

export const Header = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <header className={css.header}>
        <a href="/">
          <svg className={css.logo}></svg>
        </a>
        {isLoggedIn && <UserMenu />}
      </header>
    </>
  );
};

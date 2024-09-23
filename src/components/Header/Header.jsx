import css from './Header.module.css';
import { UserMenu } from '../UserMenu/UserMenu';

export const Header = () => {
  return (
    <>
      <header className={css.header}>
        <a href='/'>
          <svg className={css.logo}></svg>
        </a>
        <UserMenu />
      </header>
    </>
  );
};

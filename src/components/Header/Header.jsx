import css from './Header.module.css';

export const Header = () => {
  return (
    <>
      <header className={css.header}>
        <a href='/'>
          <svg className={css.logo}></svg>
        </a>
      </header>
    </>
  );
};

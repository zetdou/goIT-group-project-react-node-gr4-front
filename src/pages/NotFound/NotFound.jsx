import css from './NotFound.module.css';

export const NotFound = () => {
  return (
    <div className={css.container}>
      <h1 className={css.heading}>Error 404</h1>
      <p className={css.paragraph}>
        Sorry, the page you're looking for doesn't exist.
      </p>
    </div>
  );
};

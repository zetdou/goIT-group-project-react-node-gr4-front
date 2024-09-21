import css from './AppBg.module.css';

export const AppBg = () => {
  return (
    <>
      <div className={css.bgColor}></div>
      <svg
        className={css.svgCabbageTop}
        width={83}
        height={89}
        xmlns="http://www.w3.org/2000/svg"
      ></svg>
      <svg
        className={css.svgCabbageBottom}
        width={83}
        height={89}
        xmlns="http://www.w3.org/2000/svg"
      ></svg>
    </>
  );
};

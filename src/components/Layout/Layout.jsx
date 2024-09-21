import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { Header } from '../Header/Header';
// import { Footer } from '../Footer/Footer';
import css from './Layout.module.css';

export const Layout = () => {
  return (
    <div className={css.container}>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      {/* <Footer /> */}
    </div>
  );
};

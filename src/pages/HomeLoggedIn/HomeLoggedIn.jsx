import { Helmet } from 'react-helmet-async';
import { AppBg } from '../../components/AppBg/AppBg';
import css from './HomeLoggedIn.module.css';
// import { Header } from '../../components/Header/Header';

const HomeLoggedIn = () => {
  return (
    <>
      <AppBg />
      {/* <Header /> */}
      <main className={css.home}>
        <Helmet>
          <title>Expenses and income</title>
          <meta
            name="description"
            content="Welcome to the home page. Manage your expenses and income."
          />
          <meta
            name="keywords"
            content="home, kapusta, finances, expenses, income, balance"
          />
        </Helmet>
        <div>Home logged in view</div>
      </main>
    </>
  );
};

export default HomeLoggedIn;

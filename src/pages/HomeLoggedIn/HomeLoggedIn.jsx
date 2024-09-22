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
          <title>Home</title>
          <meta
            name="description"
            content="Welcome to the home page. Log in or sign up to manage your finances."
          />
          <meta
            name="keywords"
            content="home, kapusta, finances, login, registration, signup, signin"
          />
        </Helmet>
        <div>Home logged in view</div>
      </main>
    </>
  );
};

export default HomeLoggedIn;

import { Helmet } from 'react-helmet-async';
import googleIcon from '../../images/icons/google.svg';
import mobileLogo from '../../images/home-images/big-logo-mobile.svg';
import tabletLogo from '../../images/home-images/big-logo-tablet.svg';
import desktopLogo from '../../images/home-images/big-logo-desktop.svg';
import { AppBg } from '../../components/AppBg/AppBg';
import css from './HomeLoggedOut.module.css';
// import { Header } from '../../components/Header/Header';

const HomeLoggedOut = () => {
  return (
    <>
      <AppBg />
      {/* <Header /> */}
      <main className={css.home}>
        <Helmet>
          <title>Log in or sign up</title>
          <meta
            name="description"
            content="Welcome to the home page. Log in or sign up to manage your finances."
          />
          <meta
            name="keywords"
            content="home, kapusta, finances, login, registration, signup, signin"
          />
        </Helmet>
        <div>
          <div className={css.flexContainer}>
            <div>
              <h1 className={css.mainHeader}>
                <img className={css.smallLogo} src={mobileLogo} alt="Kapusta" />
                <img
                  className={css.mediumLogo}
                  src={tabletLogo}
                  alt="Kapusta"
                />
                <img className={css.bigLogo} src={desktopLogo} alt="Kapusta" />
              </h1>
              <p className={css.mainParagraph}>Smart finance</p>
            </div>
            <form className={css.form}>
              <fieldset className={css.fieldset}>
                <legend className={css.firstFormParagraph}>
                  You can log in with your Google Account:
                </legend>
                <button className={css.googleButton}>
                  <img src={googleIcon} alt="google" />
                  Google
                </button>
              </fieldset>
              <fieldset className={css.fieldset}>
                <legend className={css.secondFormParagraph}>
                  Or log in using an email and password, after registering:
                </legend>
                <div className={css.formContainer}>
                  <div className={css.formRow}>
                    <label className={css.label} htmlFor="email">
                      Email:
                    </label>
                    <input
                      className={css.input}
                      type="text"
                      name="email"
                      id="email"
                      placeholder="your@email.com"
                    />
                    <p className={css.required}>This is a required field</p>
                  </div>
                  <div className={css.formRow}>
                    <label className={css.label} htmlFor="password">
                      Password:
                    </label>
                    <input
                      className={css.input}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                    />
                    <p className={css.required}>This is a required field</p>
                  </div>
                </div>
                <div className={css.buttons}>
                  <button className={css.button} type="submit">
                    Log in
                  </button>
                  <button className={css.button} type="submit">
                    Registration
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomeLoggedOut;

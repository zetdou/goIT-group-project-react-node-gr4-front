import { Helmet } from 'react-helmet-async';
import googleIcon from '../../images/icons/google.svg';
import mobileLogo from '../../images/home-images/big-logo-mobile.svg';
import tabletLogo from '../../images/home-images/big-logo-tablet.svg';
import desktopLogo from '../../images/home-images/big-logo-desktop.svg';
import css from './Home.module.css';
import { AppBg } from '../../components/AppBg/AppBg';
import { Header } from '../../components/Header/Header';
import { useDispatch } from 'react-redux';
import { logIn, register } from '../../redux/Users/AuthOperations';

const Home = () => {
  const dispatch = useDispatch();

  const handleLogin = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const buttonClicked = event.nativeEvent.submitter.name;

    if (buttonClicked === 'login') {
      dispatch(
        logIn({
          email: form.elements.email.value,
          password: form.elements.password.value,
        })
      );
    } else if (buttonClicked === 'register') {
      dispatch(
        register({
          email: form.elements.email.value,
          password: form.elements.password.value,
        })
      );
    }

    form.reset();
  };

  return (
    <>
      <AppBg />
      <Header />
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
            <form className={css.form} onSubmit={handleLogin}>
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
                      pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                      placeholder="your@email.com"
                      required
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
                      minLength={6}
                      name="password"
                      id="password"
                      placeholder="Password"
                      required
                    />
                    <p className={css.required}>This is a required field</p>
                  </div>
                </div>
                <div className={css.buttons}>
                  <button className={css.button} type="submit" name="login">
                    Log in
                  </button>
                  <button className={css.button} type="submit" name="register">
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

export default Home;

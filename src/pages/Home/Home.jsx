import { Helmet } from 'react-helmet-async';
import googleIcon from '../../images/icons/google.svg';
import mobileLogo from '../../images/home-images/big-logo-mobile.svg';
import tabletLogo from '../../images/home-images/big-logo-tablet.svg';
import desktopLogo from '../../images/home-images/big-logo-desktop.svg';
// import topMobile from '../../images/home-images/1-home-mobile.png';
// import bottomMobile from '../../images/home-images/2-home-mobile.png';
import { AppBg } from '../../components/AppBg/AppBg';
import css from './Home.module.css';
// import { Header } from '../../components/Header/Header';
import { register, logIn } from '../../redux/Users/AuthOperations';
import { useDispatch } from 'react-redux';
import { auth, googleProvider } from '../../firebase';
import { signInWithRedirect } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    const form = event.currentTarget;
    const buttonClicked = event.nativeEvent.submitter.name;

    const email = form.elements.email.value;
    const password = form.elements.password.value;

    console.log('Email:', email); // Logowanie do konsoli
    console.log('Password:', password); // Logowanie do konsoli

    try {
      if (buttonClicked === 'login') {
        await dispatch(
          logIn({
            email: form.elements.email.value,
            password: form.elements.password.value,
          })
        );
      } else if (buttonClicked === 'register') {
        await dispatch(
          register({
            email: form.elements.email.value,
            password: form.elements.password.value,
          })
        );
      }
      navigate('/transactions');
    } catch (err) {
      setError('Login or registration failed. Please try again.');
    } finally {
      form.reset();
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithRedirect(auth, googleProvider);
      const user = result.user;
      dispatch(logIn({ email: user.email, name: user.displayName }));
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

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
            <form className={css.form} onSubmit={handleSubmit}>
              <fieldset className={css.fieldset}>
                <legend className={css.firstFormParagraph}>
                  You can log in with your Google Account:
                </legend>
                <button
                  className={css.googleButton}
                  type="button"
                  onClick={handleGoogleSignIn}
                >
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

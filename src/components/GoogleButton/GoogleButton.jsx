import { useGoogleLogin } from '@react-oauth/google';
// import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';
import googleIcon from '../../images/icons/google.svg';
import css from './GoogleButton.module.css';

export const GoogleButton = () => {
  const login = useGoogleLogin({
    onSuccess: credentialResponse => {
      console.log('Success:', credentialResponse);
    },
    onError: () => {
      console.log('Login Failed');
    },
    ux_mode: 'redirect',
    redirect_uri: 'http://localhost:3000',
  });

  const handleClick = e => {
    e.preventDefault();
    login();
  };

  return (
    <button className={css.googleButton} type="button" onClick={handleClick}>
      <img src={googleIcon} alt="google" />
      Google
    </button>
  );
};

// export const GoogleButton = () => {
//   return (
//     <div>
//       {/* <button
//         className={css.googleButton}
//         type="button"
//         onClick={handleGoogleSignIn}
//       >
//         <img src={googleIcon} alt="google" />
//         Google
//       </button> */}
//       <GoogleLogin
//         onSuccess={credentialResponse => {
//           // const decoded = jwtDecode(credentialResponse?.credential);
//           // console.log(decoded);
//           console.log(credentialResponse);
//         }}
//         onError={() => {
//           console.log('failed');
//         }}
//       />
//     </div>
//   );
// };

// export default GoogleButton;

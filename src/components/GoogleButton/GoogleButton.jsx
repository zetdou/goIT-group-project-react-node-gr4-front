import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';

export const GoogleButton = () => {
  return (
    <div>
      {/* <button
        className={css.googleButton}
        type="button"
        onClick={handleGoogleSignIn}
      >
        <img src={googleIcon} alt="google" />
        Google
      </button> */}
      <GoogleLogin
        onSuccess={credentialResponse => {
          // const decoded = jwtDecode(credentialResponse?.credential);
          // console.log(decoded);
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('failed');
        }}
      />
    </div>
  );
};

// export default GoogleButton;

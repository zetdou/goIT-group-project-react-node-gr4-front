import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: 'AIzaSyABLpH7gFdV8atQj4FZZ1TyQV7Y5qb4PJo',
//   authDomain: 'kapusta-348c1.firebaseapp.com',
//   projectId: 'kapusta-348c1',
//   storageBucket: 'kapusta-348c1.appspot.com',
//   messagingSenderId: '597813733475',
//   appId: '1:597813733475:web:8d3a5d9bf218d1d2e4b056',
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithRedirect };

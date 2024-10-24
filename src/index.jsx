import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { App } from './components/App';
import { store, persistor } from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'normalize.css';
import Notiflix from 'notiflix';
import './index.css';
import { setStore } from './redux/Tools/storeAccess';

Notiflix.Notify.init({
  position: 'left-bottom', // Możesz zmienić na 'left-bottom' lub inną pozycję
  distance: '20px',
  opacity: 1,
  borderRadius: '5px',
  rtl: false,
  timeout: 3000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  plainText: true,
  showOnlyTheLastOne: false,
  clickToClose: true,
  pauseOnHover: true,
  ID: 'NotiflixNotify',
  className: 'notiflix-notify',
  zindex: 4001,
  useGoogleFont: false,
});

setStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <GoogleOAuthProvider clientId="743543484063-masnnsieejb5vdo1jvcd98nr3giecho3.apps.googleusercontent.com">
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </GoogleOAuthProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

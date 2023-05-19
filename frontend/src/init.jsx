import { Provider } from 'react-redux';
import { ToastContainer } from 'react-bootstrap';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import ru from './locales/ru';
import App from './components/App';
import { ApiContext } from './contexts/index';
import store from './slices/index.js';
import AuthProvider from './contexts/AuthProvider';
import socketConfigure from './contexts/socketConfigure';
import 'bootstrap/dist/css/bootstrap.min.css';

const ApiProvider = ({ socket, children }) => {
  const api = socketConfigure(socket);
  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};

const initChat = async (socket) => {
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    environment: 'production',
  };

  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources: { ru },
      lng: 'ru',

      interpolation: {
        escapeValue: false,
      },
    });

  filter.add(filter.getDictionary('ru'));

  return (
    <Provider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <ApiProvider socket={socket}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ApiProvider>
          <ToastContainer />
        </ErrorBoundary>
      </RollbarProvider>
    </Provider>
  );
};

export default initChat;

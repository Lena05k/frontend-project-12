import { useMemo } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-bootstrap';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import ru from './locales/ru';
import { actions as messagesActions } from './slices/messagesSlice';
import { actions as channelsActions } from './slices/channelsSlice';
import { ApiContext } from './contexts/index';
import App from './components/App';
import store from './slices/index.js';
import AuthProvider from './contexts/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

const initChat = async (socket) => {
  const dispatch = useDispatch();

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
    })

  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    dispatch(channelsActions.addChannel(payload));
  });

  socket.on('removeChannel', ({ id }) => {
    dispatch(channelsActions.removeChannel(id));
  });

  socket.on('renameChannel', (payload) => {
    dispatch(channelsActions.setChannel(payload));
  });

  filter.add(filter.getDictionary('ru'));

  return (
    <Provider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <AuthProvider>
            <App />
          </AuthProvider>
          <ToastContainer />
        </ErrorBoundary>
      </RollbarProvider>
    </Provider>
  );
};

export default initChat;

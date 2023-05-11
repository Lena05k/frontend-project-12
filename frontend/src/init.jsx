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
import { SocketContext } from './contexts/index';
import App from './components/App';
import store from './slices/index.js';
import AuthProvider from './contexts/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io();

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();

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

  return (
    <SocketContext.Provider value={useMemo(() => ({ socket }), [])}>
      {children}
    </SocketContext.Provider>
  );
};

const initChat = async (socketOn) => {
  filter.add(filter.getDictionary('ru'));

  const rollbarConfig = {
    accessToken: '1be4cfe4d0894c0fb892e19a57aff1c4',
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

  return (
    <Provider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <SocketProvider socket={socketOn}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </SocketProvider>
          <ToastContainer />
        </ErrorBoundary>
      </RollbarProvider>
    </Provider>
  );
};

export default initChat;

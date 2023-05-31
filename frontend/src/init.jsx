import { Provider } from 'react-redux';
import { useMemo } from 'react';
import { ToastContainer } from 'react-bootstrap';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import ru from './locales/ru';
import App from './components/App';
import store from './slices/index.js';
import AuthProvider from './contexts/AuthProvider';
import { ApiContext } from './contexts/index';
import { actions as messagesActions } from './slices/messagesSlice';
import { actions as channelsActions } from './slices/channelsSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const promosifySocket = (socket, type, data) => new Promise((resolve, reject) => {
  socket.emit(type, data, (err, response) => {
    if (err) {
      reject(err);
    }
    resolve(response);
  });
});

const InitSocket = ({ socket, children }) => {
  const sendMessage = (message) => promosifySocket(socket, 'newMessage', message);
  const createChannel = (channel) => promosifySocket(socket, 'newChannel', channel);
  const removeChannel = (channelId) => promosifySocket(socket, 'removeChannel', channelId);
  const renameChannel = (channel) => promosifySocket(socket, 'renameChannel', channel);

  const api = useMemo(() => ({
    sendMessage,
    createChannel,
    removeChannel,
    renameChannel,
  }), [sendMessage, createChannel, removeChannel, renameChannel]);

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

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(channelsActions.removeChannel(id));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(channelsActions.setChannel(payload));
  });

  filter.add(filter.getDictionary('ru'));

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <InitSocket socket={socket}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </InitSocket>
        </Provider>
        <ToastContainer />
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default initChat;

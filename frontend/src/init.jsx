import { Provider } from 'react-redux';
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
import { addMessage } from './slices/messagesSlice';
import { actions as channelsActions } from './slices/channelsSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const promosifySocket = (socket, type, data) => new Promise((resolve, reject) => {
  socket.timeout(5000).emit(type, data, (err, response) => {
    if (err) {
      reject(err);
    }
    resolve(response);
  });
});

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
    store.dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(channelsActions.removeChannel(id));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(channelsActions.renameChannel(payload));
  });

  const addNewMessage = (message) => promosifySocket(socket, 'newMessage', message);
  const createChannel = (channel) => promosifySocket(socket, 'newChannel', channel);
  const removeChannel = (channelId) => promosifySocket(socket, 'removeChannel', channelId);
  const renameChannel = (channel) => promosifySocket(socket, 'renameChannel', channel);

  const api = {
    addNewMessage,
    createChannel,
    removeChannel,
    renameChannel,
  };

  filter.add(filter.getDictionary('ru'));

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <ApiContext.Provider value={api}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ApiContext.Provider>
        </Provider>
        <ToastContainer />
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default initChat;

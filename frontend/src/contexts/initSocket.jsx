import store from '../slices';
import { actions as messagesActions } from '../slices/messagesSlice';
import { actions as channelsActions } from '../slices/channelsSlice';
import {ApiContext} from "./index";

const promosifySocket = (socket, type, data) => new Promise((resolve, reject) => {
  socket.emit(type, data, (err, response) => {
    if (err) {
      reject(err);
    }
    resolve(response);
  });
});

const SocketConfigure = ({ socket, children }) => {
  const sendMessage = (message) => promosifySocket(socket, 'newMessage', message);
  const createChannel = (channel) => promosifySocket(socket, 'newChannel', channel);
  const removeChannel = (channelId) => promosifySocket(socket, 'removeChannel', channelId);
  const renameChannel = (channel) => promosifySocket(socket, 'renameChannel', channel);

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

  const api = {
    sendMessage,
    createChannel,
    removeChannel,
    renameChannel,
  }

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};

export default SocketConfigure;

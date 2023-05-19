import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import userInterfaceReducer from './userInterfaceSlice';
import messagesReducer from './messagesSlice';
import modalReducer from './modalSlice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    ui: userInterfaceReducer,
    modal: modalReducer,
  },
});

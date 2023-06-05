import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import modalsSlice from './modalSlice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modalsSlice,
  },
});

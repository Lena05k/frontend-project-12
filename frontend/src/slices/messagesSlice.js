import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: (state, { payload }) => {
      state.messages = payload;
    },
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.removeChannel, (state, { payload }) => {
      const channelId = payload.id;
      const filteredMessages = state.messages.filter((m) => m.channelId !== channelId);
      state.messages = filteredMessages;
    });
  },
});

console.log('messagesSlice', messagesSlice);
export const selectors = messagesAdapter.getSelectors((state) => state.messages);

export const { addMessage, addMessages } = messagesSlice.actions;

export default messagesSlice.reducer;

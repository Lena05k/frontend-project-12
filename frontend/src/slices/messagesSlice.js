import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.js';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages(state, { payload }) {
      state.messages = payload;
    },
    addMessage(state, { payload }) {
      state.messages = [...state.messages, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        const { id } = payload;
        state.messages = state.messages.filter((message) => message.channelId !== id);
      });
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;

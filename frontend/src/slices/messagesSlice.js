import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchInitialData from './fetchInitialData';
import { actions as ChannelsActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(ChannelsActions.removeChannel, (state, action) => {
        const restMessages = Object.values(state.entities)
          .filter(({ channelId }) => channelId !== action.payload);
        messagesAdapter.setAll(state, restMessages);
      })
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        const { messages } = action.payload;
        messagesAdapter.addMany(state, messages);
      });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);

export const { addMessage, addMessages } = messagesSlice.actions;

export default messagesSlice.reducer;

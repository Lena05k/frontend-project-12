import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: '',
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels(state, { payload }) {
      const newChannels = payload;
      state.channels = newChannels;
    },
    addChannel(state, { payload }) {
      state.channels.push(payload);
    },
    removeChannel(state, { payload }) {
      const { id } = payload;
      const newState = state.channels.filter((channel) => channel.id !== id);
      state.channels = newState;
      if (state.currentChannelId === id) {
        state.currentChannelId = state.channels[0].id || '';
      }
    },
    renameChannel(state, { payload }) {
      const { id, name } = payload;
      const newState = state.channels.map((channel) => {
        if (channel.id === id) {
          channel.name = name;
        }
        return channel;
      });
      state.channels = newState;
    },
    changeCurrentChannel(state, { payload }) {
      const id = payload;
      state.currentChannelId = id;
    },
  },
});

export const { actions } = channelSlice;
export default channelSlice.reducer;

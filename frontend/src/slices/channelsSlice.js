import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchInitialData from './fetchInitialData';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: channelsAdapter.removeOne,
    setChannel: channelsAdapter.setOne,
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        const { channels } = action.payload;
        channelsAdapter.addMany(state, channels);
      });
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;

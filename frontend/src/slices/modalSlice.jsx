/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  channelId: null,
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    open: (state, { payload }) => {
      state.type = payload.type;
      state.channelId = payload.id;
    },
    close: (state) => {
      state.type = null;
      state.channelId = null;
    },
  },
});

export const { open, close } = modalSlice.actions;
export const getModalType = (state) => state.modal.type;
export const getChannelId = (state) => state.modal.channelId;
export default modalSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  id: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.type = payload.type;
      state.item = payload.item;
    },
    closeModal: (state) => {
      state.type = null;
      state.item = null;
    },
  },
});

export const { showModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  modalProps: {},
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal(state, action) {
      return {
        modalType: action.payload.modalType,
        modalProps: action.payload.modalProps,
      };
    },
    hideModal() {
      return initialState;
    },
  },
});

export const { actions: actionsModals } = modalsSlice;
export default modalsSlice.reducer;

export const selectModalType = (state) => state.modals.modalType;
export const selectModalProps = (state) => state.modals.modalProps;

export const selectorsModals = {
  selectModalType,
  selectModalProps,
};

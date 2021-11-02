import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAlertState {
  portal: {
    modal?: boolean;
    spinner?: boolean;
  };
}

const initialState = {
  modal: false,
  spinner: false,
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setSpinner(state, action: PayloadAction<boolean>) {
      state.spinner = action.payload;
    },
    setModal(state, action: PayloadAction<boolean>) {
      state.modal = action.payload;
    },
  },
});

const { actions, reducer } = uploadSlice;
export const { setSpinner, setModal } = actions;
export default reducer;

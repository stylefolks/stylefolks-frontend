import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAlertState {
  portal: {
    modal?: boolean;
    spinner?: boolean;
  };
  alert: {
    isVisible: boolean;
    content: string;
    title: string;
  };
  // secondCategory: SecondCategoryName;
}

const initialState = {
  modal: false,
  spinner: false,
  alert: {
    isVisible: false,
    content: '',
    title: '',
  },
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setAlert(state, action: PayloadAction<{ title: string; content: string }>) {
      state.alert.isVisible = true;
      state.alert.title = action.payload.title;
      state.alert.content = action.payload.content;
    },
    unmountAlert(state) {
      state.alert = { title: '', content: '', isVisible: false };
    },
    setSpinner(state, action: PayloadAction<boolean>) {
      state.spinner = action.payload;
    },
    setModal(state, action: PayloadAction<boolean>) {
      state.modal = action.payload;
    },
  },
});

const { actions, reducer } = uploadSlice;
export const { setAlert, setSpinner, unmountAlert, setModal } = actions;
export default reducer;

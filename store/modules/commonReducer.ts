import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAlertState {
  portal: {
    modal?: boolean;
    spinner?: boolean;
  };
  alert: {
    content: string;
    title: string;
  };
  // secondCategory: SecondCategoryName;
}

const initialState = {
  portal: {
    modal: false,
    spinner: false,
  },
  alert: {
    content: '',
    title: '',
  },
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setAlert(state, action: PayloadAction<{ title: string; content: string }>) {
      state.portal.modal = true;
      state.alert.title = action.payload.title;
      state.alert.content = action.payload.content;
    },
    umountAlert(state) {
      state.portal.modal = false;
      state.alert = { title: '', content: '' };
    },
    setSpinner(state, action: PayloadAction<boolean>) {
      state.portal.spinner = action.payload;
    },
  },
});

const { actions, reducer } = uploadSlice;
export const { setAlert, setSpinner, umountAlert } = actions;
export default reducer;

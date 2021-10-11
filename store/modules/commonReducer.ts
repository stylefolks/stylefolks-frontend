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
    setAlert(state, action: PayloadAction<IAlertState>) {
      state.portal.modal = action.payload.portal.modal;
      state.alert = action.payload.alert;
    },
    setSpinner(state, action: PayloadAction<boolean>) {
      state.portal.spinner = action.payload;
    },
  },
});

const { actions, reducer } = uploadSlice;
export const { setAlert, setSpinner } = actions;
export default reducer;

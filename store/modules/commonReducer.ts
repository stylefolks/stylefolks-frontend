import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAlertState {
  portal: {
    mounted: boolean;
  };
  alert: {
    content: string;
    title: string;
  };
  // secondCategory: SecondCategoryName;
}

const initialState = {
  portal: {
    mounted: false,
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
      state.portal.mounted = action.payload.portal.mounted;
      state.alert = action.payload.alert;
    },
  },
});

const { actions, reducer } = uploadSlice;
export const { setAlert } = actions;
export default reducer;

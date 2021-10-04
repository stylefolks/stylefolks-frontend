import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FirstCategoryName } from '../../src/__generated__/globalTypes';

export interface IPostState {
  title: string;
  content: string;
  firstCategory: FirstCategoryName;
  // secondCategory: SecondCategoryName;
}

const initialState = {
  post: { title: '', content: '', firstCategory: FirstCategoryName.TALK },
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    upadatePost(state, action: PayloadAction<IPostState>) {
      state.post = action.payload;
    },
  },
});

const { actions, reducer } = uploadSlice;
export const { upadatePost } = actions;
export default reducer;

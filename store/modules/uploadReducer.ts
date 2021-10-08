import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPostState {
  title: string;
  contents: string;
  titleImg: string;
  firstCategoryName: string;
  firstCategoryId: number | null;
  secondCategoryId: number | null;

  // secondCategory: SecondCategoryName;
}

const initialState = {
  post: {
    title: '',
    contents: '',
    titleImg: '',
    firstCategoryName: '',
    firstCategoryId: null,
    secondCategoryId: null,
  },
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

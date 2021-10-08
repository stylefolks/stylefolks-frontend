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

interface IUploadState {
  post: IPostState;
  titleImageArr: string[];
}

const initialState: IUploadState = {
  post: {
    title: '',
    contents: '',
    titleImg: '',
    firstCategoryName: '',
    firstCategoryId: null,
    secondCategoryId: null,
  },
  titleImageArr: [],
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    upadatePost(state, action: PayloadAction<IUploadState['post']>) {
      state.post = action.payload;
    },
    updateTitleImageArr(state, action: PayloadAction<string>) {
      state.titleImageArr = [...state.titleImageArr, action.payload];
    },
  },
});

const { actions, reducer } = uploadSlice;
export const { upadatePost, updateTitleImageArr } = actions;
export default reducer;

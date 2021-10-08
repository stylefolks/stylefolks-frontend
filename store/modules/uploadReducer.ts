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

export const uploadInitialState: IUploadState = {
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
  initialState: uploadInitialState,
  reducers: {
    upadatePost(state, action: PayloadAction<IUploadState['post']>) {
      state.post = action.payload;
    },
    updateTitleImageArr(state, action: PayloadAction<string>) {
      state.titleImageArr = [...state.titleImageArr, action.payload];
    },
    initializeUploadState(state) {
      state.post = uploadInitialState.post;
      state.titleImageArr = uploadInitialState.titleImageArr;
    },
  },
});

const { actions, reducer } = uploadSlice;
export const { upadatePost, updateTitleImageArr, initializeUploadState } =
  actions;
export default reducer;

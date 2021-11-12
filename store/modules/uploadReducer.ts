import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FirstCategoryName,
  SecondCategoryName,
} from './../../src/__generated__/globalTypes';

export interface IPostState {
  title: string;
  contents: string;
  titleImg: string;
  firstCategoryName?: FirstCategoryName;
  secondCategoryName?: SecondCategoryName;
}

interface IUploadState {
  post: IPostState;
  titleImageArr: string[];
  isTemp: boolean;
  isModify: boolean;
  pickTempId?: number | null;
  prevTempId?: number | null;
  modifyPostId?: number | null;
}

export const uploadInitialState: IUploadState = {
  post: {
    title: '',
    contents: '',
    titleImg: '',
    firstCategoryName: FirstCategoryName.TALK,
    secondCategoryName: SecondCategoryName.FREE,
  },
  titleImageArr: [],
  isTemp: false,
  isModify: false,
  pickTempId: null,
  prevTempId: null,
  modifyPostId: null,
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState: uploadInitialState,
  reducers: {
    updateTitleImageArr(state, action: PayloadAction<string>) {
      state.titleImageArr = [...state.titleImageArr, action.payload];
    },

    initializeUploadState(state) {
      state.post = uploadInitialState.post;
      state.titleImageArr = uploadInitialState.titleImageArr;
      state.isTemp = false;
      state.isModify = false;
      state.modifyPostId = null;
      state.pickTempId = null;
      state.prevTempId = null;
    },
  },
});

const { actions, reducer } = uploadSlice;
export const { updateTitleImageArr, initializeUploadState } = actions;
export default reducer;

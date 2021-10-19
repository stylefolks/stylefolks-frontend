import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRole } from '../../src/__generated__/globalTypes';

export interface IUserState {
  email: string;
  id: string | null;
  role: UserRole;
  profileImg: string;
  nickname: string;
  link: string;
  // secondCategory: SecondCategoryName;
}

export interface IUserReducerState {
  user: IUserState;
  isPhotoUploadActive: boolean;
}

const initialState: IUserReducerState = {
  user: {
    email: '',
    id: null,
    role: UserRole.User,
    profileImg: '',
    nickname: '',
    link: '',
  },
  isPhotoUploadActive: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    upadateUser(state, action: PayloadAction<IUserState>) {
      state.user = action.payload;
    },
    setIsPhotoUploadActive(state, { payload }: PayloadAction<boolean>) {
      state.isPhotoUploadActive = payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { upadateUser, setIsPhotoUploadActive } = actions;
export default reducer;

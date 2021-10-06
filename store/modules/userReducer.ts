import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRole } from '../../src/__generated__/globalTypes';

export interface IUserState {
  email: string;
  id: string | null;
  role: UserRole;
  profileImg: string;
  nickname: string;
  // secondCategory: SecondCategoryName;
}

const initialState = {
  user: {
    email: '',
    id: null,
    role: UserRole.User,
    profileImg: '',
    nickname: '',
  },
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    upadateUser(state, action: PayloadAction<IUserState>) {
      state.user = action.payload;
    },
  },
});

const { actions, reducer } = uploadSlice;
export const { upadateUser } = actions;
export default reducer;

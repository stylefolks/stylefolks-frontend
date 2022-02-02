import { makeVar, ReactiveVar } from '@apollo/client';
import { SecondCategoryName, UserRole } from 'src/__generated__/globalTypes';
import { FirstCategoryName } from './../../src/__generated__/globalTypes';

export interface IUserInforVar {
  email: string;
  id: number | null;
  role: UserRole;
  profileImg: string;
  nickname: string;
  link: string;
  verified: boolean;
}

interface IAlert {
  title: string;
  content: string;
  visible: boolean;
}

interface IPostVar {
  title: string;
  contents: string;
  titleImg: string;
  firstCategoryName?: FirstCategoryName;
  secondCategoryName?: SecondCategoryName;
  crewId?: number;
  brandId?: number;
}

interface IPostStatus {
  isTemp: boolean;
  isModify: boolean;
  pickTempId: null | number;
  prevTempId: null | number;
  modifyPostId: null | number;
  titleImageArr: [] | string[];
}

interface IModalStatus {
  isVisibleCrewUserManageModal: boolean;
}

export const initialModalVisibleVar: IModalStatus = {
  isVisibleCrewUserManageModal: false,
};

export const initialWrittePostVar: IPostVar = {
  title: '',
  contents: '',
  titleImg: '',
  firstCategoryName: FirstCategoryName.TALK,
  secondCategoryName: SecondCategoryName.FREE,
  crewId: null,
  brandId: null,
};

export const initialPostStatusVar: IPostStatus = {
  isTemp: false,
  isModify: false,
  pickTempId: null,
  prevTempId: null,
  modifyPostId: null,
  titleImageArr: [],
};

export const initialUserInfoVar: IUserInforVar = {
  email: '',
  id: null,
  role: UserRole.User,
  profileImg: '',
  nickname: '',
  link: '',
  verified: false,
};

const token =
  typeof window !== 'undefined' ? localStorage.getItem('folks-token') : '';
const refreshToken =
  typeof window !== 'undefined'
    ? localStorage.getItem('folks-refresh-token')
    : '';
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);
export const refreshTokenVar = makeVar(refreshToken);
export const userInfoVar: ReactiveVar<IUserInforVar> = makeVar({
  ...initialUserInfoVar,
});
export const modalVisibleVar: ReactiveVar<IModalStatus> = makeVar({
  ...initialModalVisibleVar,
});

export const writtenPostVar = makeVar<IPostVar>({
  ...initialWrittePostVar,
});

export const postStatusVar: ReactiveVar<IPostStatus> = makeVar<IPostStatus>({
  ...initialPostStatusVar,
});

export const isAlertVar: ReactiveVar<IAlert> = makeVar({
  title: '',
  content: '',
  visible: false,
});

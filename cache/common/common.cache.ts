import { makeVar, ReactiveVar } from '@apollo/client';
import { SecondCategoryName, UserRole } from 'src/__generated__/globalTypes';
import { FirstCategoryName } from './../../src/__generated__/globalTypes';

interface IUserInforVar {
  email: string;
  id: number | null;
  role: UserRole;
  profileImg: string;
  nickname: string;
  link: string;
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

interface ISpinnerStatus {
  isVisibleSpinner: boolean;
}

export const initialModalVisibleVar: IModalStatus = {
  isVisibleCrewUserManageModal: false,
};

export const initialIsVisibleSpinnerVar: ISpinnerStatus = {
  isVisibleSpinner: false,
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
};

const token =
  typeof window !== 'undefined' ? localStorage.getItem('folks-token') : '';
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);
export const userInfoVar: ReactiveVar<IUserInforVar> = makeVar({
  ...initialUserInfoVar,
});
export const modalVisibleVar: ReactiveVar<IModalStatus> = makeVar({
  ...initialModalVisibleVar,
});

export const spinnerVisibleVar: ReactiveVar<boolean> = makeVar(false);

export const writtenPostVar = makeVar<IPostVar>({
  ...initialWrittePostVar,
});

export const postStatusVar: ReactiveVar<IPostStatus> = makeVar<IPostStatus>({
  ...initialPostStatusVar,
});

export const alertVar: ReactiveVar<IAlert> = makeVar({
  title: '',
  content: '',
  visible: false,
});

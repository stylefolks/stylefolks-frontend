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

const token =
  typeof window !== 'undefined' ? localStorage.getItem('folks-token') : '';
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);
export const userInfoVar: ReactiveVar<IUserInforVar> = makeVar({
  email: '',
  id: null,
  role: UserRole.User,
  profileImg: '',
  nickname: '',
  link: '',
});

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

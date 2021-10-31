import { makeVar, ReactiveVar } from '@apollo/client';
import { UserRole } from 'src/__generated__/globalTypes';

interface IUserInforVar {
  email: string;
  id: number | null;
  role: UserRole;
  profileImg: string;
  nickname: string;
  link: string;
}

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

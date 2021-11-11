import { concatPagination } from '@apollo/client/utilities';
import {
  alertVar,
  authTokenVar,
  isLoggedInVar,
  userInfoVar,
  writtenPostVar,
} from 'cache/common/common.cache';

export const nickname = {
  read() {
    return userInfoVar();
  },
};

export const token = {
  read() {
    return authTokenVar();
  },
};

export const isLoggedIn = {
  read() {
    return isLoggedInVar();
  },
};

export const alert = {
  read() {
    return alertVar();
  },
};

export const writtenPost = {
  read() {
    return writtenPostVar();
  },
};

export const allPosts = concatPagination();

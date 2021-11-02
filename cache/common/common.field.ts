import { concatPagination } from '@apollo/client/utilities';
import {
  alertVar,
  authTokenVar,
  isLoggedInVar,
  userInfoVar,
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

export const allPosts = concatPagination();

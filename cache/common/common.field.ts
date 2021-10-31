import { concatPagination } from '@apollo/client/utilities';
import {
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

export const allPosts = concatPagination();

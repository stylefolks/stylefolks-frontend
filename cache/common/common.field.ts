import { concatPagination } from '@apollo/client/utilities';
import {
  authTokenVar,
  isAlertVar,
  isLoggedInVar,
  modalVisibleVar,
  refreshTokenVar,
  userInfoVar,
  writtenPostVar,
} from 'cache/common/common.cache';
import { postStatusVar } from './common.cache';

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

export const refreshToken = {
  read() {
    return refreshTokenVar();
  },
};

export const isLoggedIn = {
  read() {
    return isLoggedInVar();
  },
};

export const isAlert = {
  read() {
    return isAlertVar();
  },
};

export const writtenPost = {
  read() {
    return writtenPostVar();
  },
};

export const postStatus = {
  read() {
    return postStatusVar();
  },
};

export const modalVisible = {
  read() {
    return modalVisibleVar();
  },
};

export const allPosts = concatPagination();

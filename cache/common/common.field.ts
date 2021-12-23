import { concatPagination } from '@apollo/client/utilities';
import {
  alertVar,
  authTokenVar,
  isLoggedInVar,
  modalVisibleVar,
  spinnerVisibleVar,
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

export const isLoggedIn = {
  read() {
    return isLoggedInVar();
  },
};

export const isAlert = {
  read() {
    return alertVar();
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

export const spinnerVisible = {
  read() {
    return spinnerVisibleVar();
  },
};

export const allPosts = concatPagination();

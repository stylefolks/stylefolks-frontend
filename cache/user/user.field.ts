import {
  isUserTotalPostVar,
  isVisibleEditProfileModalVar,
  isVisibleProfileImageModalVar,
} from './user.cache';

export const isUserTotalPost = {
  read() {
    return isUserTotalPostVar();
  },
};

export const isVisibleProfileImageModal = {
  read() {
    return isVisibleProfileImageModalVar();
  },
};

export const isVisibleEditProfileModal = {
  read() {
    return isVisibleEditProfileModalVar();
  },
};

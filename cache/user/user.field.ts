import { isUserTotalPostVar } from './user.cache';

export const isUserTotalPost = {
  read() {
    return isUserTotalPostVar();
  },
};

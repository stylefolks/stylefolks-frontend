import { useReactiveVar } from '@apollo/client';
import { isUserTotalPostVar } from 'cache/user/user.cache';
import { useMe } from 'hooks/useMe';
import { useRouter } from 'next/router';

interface IuseUser {
  userNick: string;
}

const useUser = ({ userNick }: IuseUser) => {
  const { refetch } = useMe();
  const isUserTotal = useReactiveVar(isUserTotalPostVar);
  const router = useRouter();

  return {
    state: {
      isUserTotal,
    },
    actions: {},
  };
};

export default useUser;

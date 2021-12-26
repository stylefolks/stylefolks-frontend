import { useQuery, useReactiveVar } from '@apollo/client';
import { isUserTotalPostVar } from 'cache/user/user.cache';
import { FIND_BY_NICKNAME } from 'graphql/user/queries';
import {
  findByNickName,
  findByNickNameVariables,
} from 'src/__generated__/findByNickName';

interface IuseUser {
  nickname: string;
}

const useUser = ({ nickname }: IuseUser) => {
  const isUserTotal = useReactiveVar(isUserTotalPostVar);

  const {
    data,
    loading,
    error,
    refetch: refetchFindByNickName,
  } = useQuery<findByNickName, findByNickNameVariables>(FIND_BY_NICKNAME, {
    variables: {
      nickname,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });

  const doRefetch = () => {
    refetchFindByNickName({
      nickname,
    });
  };

  return {
    state: {
      isUserTotal,
      data,
      error,
      loading,
    },
    actions: {
      doRefetch,
    },
  };
};

export default useUser;

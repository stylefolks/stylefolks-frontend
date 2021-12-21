import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { isUserTotalPostVar } from 'cache/user/user.cache';
import { GET_USER_CREW } from 'graphql/queries';
import { useMe } from 'hooks/useMe';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  getUserCrew,
  getUserCrewVariables,
} from 'src/__generated__/getUserCrew';

interface IuseUser {
  userNick: string;
}

const useUser = ({ userNick }: IuseUser) => {
  const { refetch } = useMe();
  const isUserTotal = useReactiveVar(isUserTotalPostVar);
  const router = useRouter();
  const [
    getUserCrewDataMutation,
    {
      data: getUserCrewData,
      loading: getUserCrewLoading,
      error: getUserCrewError,
    },
  ] = useLazyQuery<getUserCrew, getUserCrewVariables>(GET_USER_CREW, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });

  if (getUserCrewError) {
    router.push('/');
  }

  useEffect(() => {
    getUserCrewDataMutation({
      variables: {
        nickname: userNick,
      },
    });
  }, []);

  return {
    state: {
      getUserCrewData,
      getUserCrewLoading,
      isUserTotal,
    },
    actions: {},
  };
};

export default useUser;

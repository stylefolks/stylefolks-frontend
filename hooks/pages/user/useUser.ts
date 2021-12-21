import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { alertVar } from 'cache/common/common.cache';
import {
  isUserTotalPostVar,
  isVisibleEditProfileModalVar,
  isVisibleProfileImageModalVar,
} from 'cache/user/user.cache';
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
  const alert = alertVar();
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

  const onConfirmAlert = () => {
    alertVar({ title: '', content: '', visible: false });
    if (alert.title === '프로필 이미지 수정') {
      router.reload();
      isVisibleProfileImageModalVar(false);
      refetch(); //여기도 나중에 캐시만 업데이트 하는 방식으로 변경하자
    }

    if (alert.title === '비밀번호 변경') {
      isVisibleEditProfileModalVar(false);
    }
  };

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
    actions: {
      onConfirmAlert,
    },
  };
};

export default useUser;

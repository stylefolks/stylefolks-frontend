import { useQuery } from '@apollo/client';
import PageChange from 'components/pageChange/PageChange';
import EditProfileImageModal from 'components/user/EditProfileImageModal';
import EditProfileModal from 'components/user/EditProfileModal';
import UserAllContents from 'components/user/UserAllContents';
import UserContents from 'components/user/UserContents';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import UserStyle from 'styles/User.module.scss';
import { FIND_BY_NICKNAME } from '../../graphql/queries';
import useUser from '../../hooks/pages/user/useUser';
import {
  findByNickName,
  findByNickNameVariables,
} from '../../src/__generated__/findByNickName';

const DynamicUserProfile = dynamic(
  () => import('components/user/UserProfile'),
  {
    ssr: false,
  }
);

const User = () => {
  const router = useRouter();
  const { id } = router.query;
  const nickname = id as string;

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

  const { state } = useUser({ userNick: nickname });
  const { getUserCrewLoading, isUserTotal } = state;

  if (error) {
    alert('에러가 발생했습니다.');
    return <PageChange />;
  }
  if (getUserCrewLoading || loading) return <PageChange />;

  return (
    <div className={UserStyle.container}>
      <div className={UserStyle.userContainer}>
        <DynamicUserProfile pageUserData={data.findByNickName.user} />
      </div>
      {isUserTotal ? (
        <UserAllContents pageUserData={data.findByNickName.user} />
      ) : (
        <UserContents nickname={nickname} />
      )}
      <EditProfileModal doRefetch={doRefetch} />
      <EditProfileImageModal doRefetch={doRefetch} />
    </div>
  );
};

export default User;

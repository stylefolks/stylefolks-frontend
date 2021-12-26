import PageChange from 'components/pageChange/PageChange';
import EditProfileImageModal from 'components/user/EditProfileImageModal';
import EditProfileModal from 'components/user/EditProfileModal';
import UserAllContents from 'components/user/UserAllContents';
import UserContents from 'components/user/UserContents';
import useUser from 'hooks/pages/user/useUser';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import UserStyle from 'styles/User.module.scss';

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

  const { state, actions } = useUser({ nickname });
  const { loading, data, error, isUserTotal } = state;
  const { doRefetch } = actions;

  if (error) {
    alert('에러가 발생했습니다.');
    return <PageChange />;
  }
  if (loading) return <PageChange />;

  return (
    <div className={UserStyle.container}>
      <div className={UserStyle.userContainer}>
        <DynamicUserProfile
          user={data.findByNickName.user}
          crews={data.findByNickName.crews}
        />
      </div>
      {isUserTotal ? (
        <UserAllContents nickname={nickname} />
      ) : (
        <UserContents nickname={nickname} />
      )}
      <EditProfileModal doRefetch={doRefetch} />
      <EditProfileImageModal doRefetch={doRefetch} />
    </div>
  );
};

export default User;

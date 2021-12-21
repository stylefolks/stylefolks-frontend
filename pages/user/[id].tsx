import { useQuery } from '@apollo/client';
import PageChange from 'components/pageChange/PageChange';
import EditProfileImageModal from 'components/user/EditProfileImageModal';
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

const DynamicAlert = dynamic(() => import('components/common/Alert'), {
  ssr: false,
});

const DynamicEditProfile = dynamic(
  () => import('components/user/EditProfileModal'),
  { ssr: false }
);

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

  const { data, loading, error } = useQuery<
    findByNickName,
    findByNickNameVariables
  >(FIND_BY_NICKNAME, {
    variables: {
      nickname,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });

  const { state, actions } = useUser({ userNick: nickname });
  const { getUserCrewLoading, isUserTotal } = state;
  const { onConfirmAlert } = actions;

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
        <UserContents pageUserData={data.findByNickName.user} />
      )}
      <DynamicEditProfile />
      <EditProfileImageModal />
      <DynamicAlert onConfirm={onConfirmAlert} />
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const apolloClient = initializeApollo();

//   const data: { data: { findByNickName: findByNickName_findByNickName } } =
//     await apolloClient.query({
//       query: FIND_BY_NICKNAME,
//       variables: {
//         nickname: params?.id,
//       },
//     });

//   if (!data) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   return addApolloState(apolloClient, {
//     props: {
//       pageUserData: data.data.findByNickName.user,
//       userNick: params?.id,
//     },
//   });
// };

export default User;

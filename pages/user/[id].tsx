import PageChange from 'components/pageChange/PageChange';
import EditProfileImageModal from 'components/user/EditProfileImageModal';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import UserStyle from 'styles/User.module.scss';
import { FIND_BY_NICKNAME } from '../../graphql/queries';
import {
  findByNickName_findByNickName,
  findByNickName_findByNickName_user,
} from '../../src/__generated__/findByNickName';
import useUser from './hooks/useUser';

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

const DynamicUserContents = dynamic(
  () => import('components/user/UserContents'),
  {
    ssr: false,
  }
);

const DynamicUserAllContents = dynamic(
  () => import('components/user/UserAllContents')
);

const User: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> =
  ({
    pageUserData,
    userNick,
  }: {
    pageUserData: findByNickName_findByNickName_user;
    userNick: string;
  }) => {
    const { state, actions } = useUser({ userNick });
    const { getUserCrewLoading, isUserTotal } = state;
    const { onConfirmAlert } = actions;
    if (getUserCrewLoading) return <PageChange />;

    return (
      <div className={UserStyle.container}>
        <div className={UserStyle.userContainer}>
          <DynamicUserProfile pageUserData={pageUserData} />
        </div>
        {isUserTotal ? (
          <DynamicUserAllContents pageUserData={pageUserData} />
        ) : (
          <DynamicUserContents pageUserData={pageUserData} />
        )}
        <DynamicEditProfile />
        <EditProfileImageModal />
        <DynamicAlert onConfirm={onConfirmAlert} />
      </div>
    );
  };

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const data: { data: { findByNickName: findByNickName_findByNickName } } =
    await apolloClient.query({
      query: FIND_BY_NICKNAME,
      variables: {
        nickname: params?.id,
      },
    });

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return addApolloState(apolloClient, {
    props: {
      pageUserData: data.data.findByNickName.user,
      userNick: params?.id,
    },
  });
};

export default User;

import { useQuery } from '@apollo/client';
import UploadModal from 'components/user/UploadModal';
import {
  addApolloState,
  initializeApollo,
  userInfoVar,
} from 'lib/apolloClient';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import {
  getUserCrew,
  getUserCrewVariables,
} from 'src/__generated__/getUserCrew';
import UserStyle from 'styles/User.module.scss';
import { FIND_BY_NICKNAME, GET_USER_CREW } from '../../graphql/queries';
import {
  findByNickName_findByNickName,
  findByNickName_findByNickName_user,
} from '../../src/__generated__/findByNickName';

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

const User: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> =
  ({
    pageUserData,
    userNick,
  }: {
    pageUserData: findByNickName_findByNickName_user;
    userNick: string;
  }) => {
    const user = userInfoVar();

    const {
      data: getUserCrewData,
      loading: getUserCrewLoading,
      error: getUserCrewError,
    } = useQuery<getUserCrew, getUserCrewVariables>(GET_USER_CREW, {
      variables: {
        nickname: userNick,
      },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'network-only',
    });

    if (getUserCrewLoading) return <div>Loading..</div>;

    return (
      <div className={UserStyle.container}>
        <div className={UserStyle.userContainer}>
          <DynamicUserProfile pageUserData={pageUserData} />
        </div>
        <DynamicUserContents pageUserData={pageUserData} />
        <UploadModal />
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

import { useQuery, useReactiveVar } from '@apollo/client';
import { alertVar } from 'cache/common/common.cache';
import {
  isUserTotalPostVar,
  isVisibleEditProfileModalVar,
  isVisibleProfileImageModalVar,
} from 'cache/user/user.cache';
import PageChange from 'components/pageChange/PageChange';
import EditProfileImageModal from 'components/user/EditProfileImageModal';
import { useMe } from 'hooks/useMe';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
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
    const { refetch } = useMe();
    const isUserTotal = useReactiveVar(isUserTotalPostVar);
    const alert = alertVar();
    const router = useRouter();
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

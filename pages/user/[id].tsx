import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FIND_BY_NICKNAME } from '../../graphql/queries';
import { useMe } from '../../hooks/useMe';
import {
  addApolloState,
  initializeApollo,
  userInfoVar,
} from '../../lib/apolloClient';
import vacantImage from '../../public/solidwhite.png';
import {
  findByNickName_findByNickName,
  findByNickName_findByNickName_user,
} from '../../src/__generated__/findByNickName';

const User: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> =
  ({
    data,
    paramsId,
  }: {
    data: findByNickName_findByNickName_user;
    paramsId: string;
  }) => {
    const router = useRouter();
    const [queryReadyToStart, { data: loginUserData, loading, error }] =
      useMe();
    const [isUser, setIsUser] = useState<boolean>(false);

    const userInfor = userInfoVar();
    console.log(userInfor);
    console.log('In COmp', data);

    useEffect(() => {
      queryReadyToStart();

      if ((!loading && error) || !data) {
        router.push('/');
      }
    }, []);

    useEffect(() => {
      if (loginUserData?.me.nickname === paramsId) {
        console.log(loginUserData?.me.id, paramsId);

        setIsUser(true);
      }
    }, [loginUserData]);

    return (
      <>
        <Image
          src={data?.profileImg ? data?.profileImg : vacantImage}
          alt="profile-image"
          width="40px"
          height="40px"
        />
        {isUser ? <span>You are user</span> : <span>NO USER</span>}

        <div>Hello User Email: {data?.email}</div>
        <div>Hello User NickName: {data?.nickname}</div>
      </>
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
  console.log(typeof data, data.data.findByNickName.user);

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return addApolloState(apolloClient, {
    props: { data: data.data.findByNickName.user, paramsId: params?.id },
  });
};

export default User;

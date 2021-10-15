import { useLazyQuery } from '@apollo/client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getUserCrew,
  getUserCrewVariables,
} from 'src/__generated__/getUserCrew';
import UserStyle from 'styles/User.module.scss';
import { FIND_BY_NICKNAME, GET_USER_CREW } from '../../graphql/queries';
import { useMe } from '../../hooks/useMe';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';
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
    const { data: loginUserData, loading, error } = useMe();
    const [isUser, setIsUser] = useState<boolean>(false);
    const [
      getUserCrew,
      {
        data: getUserCrewData,
        loading: getUserCrewLoading,
        error: getUserCrewError,
      },
    ] = useLazyQuery<getUserCrew, getUserCrewVariables>(GET_USER_CREW);

    useEffect(() => {
      if ((!loading && error) || !data) {
        router.push('/');
      }
    }, []);

    useEffect(() => {
      if (loginUserData?.me.nickname === paramsId) {
        setIsUser(true);
        console.log(data?.nickname);
        getUserCrew({
          variables: {
            nickname: data?.nickname,
          },
        });
      }
    }, [loginUserData]);

    const onClick = () => {
      console.log('upload image');
    };
    if (getUserCrewLoading) return <div>Loading..</div>;

    console.log(getUserCrewError, getUserCrewData);
    return (
      <div className={UserStyle.userContainer}>
        <div className={UserStyle.userInfoWrapper}>
          <div className={UserStyle.userImageWrapper}>
            <Image
              className={UserStyle.profileImage}
              src={data?.profileImg ? data?.profileImg : vacantImage}
              alt="profile-image"
              width="80px"
              height="80px"
            />
          </div>
          <span> {data?.nickname}</span>
          {/* {isUser ? <span>You are user</span> : <span>NO USER</span>} */}
        </div>
        <div>
          {getUserCrewData &&
            getUserCrewData?.getUserCrew?.crews?.map((el) => (
              <li key={el.id}>{el.name}</li>
            ))}
          <span>Hello User NickName: {data?.nickname}</span>
        </div>
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
    props: { data: data.data.findByNickName.user, paramsId: params?.id },
  });
};

export default User;

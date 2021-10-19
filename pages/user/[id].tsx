import { useLazyQuery } from '@apollo/client';
import UploadModal from 'components/user/UploadModal';
import UserProfile from 'components/user/UserProfile';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserCrew,
  getUserCrewVariables,
} from 'src/__generated__/getUserCrew';
import { RootState } from 'store/modules';
import { setModal } from 'store/modules/commonReducer';
import UserStyle from 'styles/User.module.scss';
import { FIND_BY_NICKNAME, GET_USER_CREW } from '../../graphql/queries';
import {
  findByNickName_findByNickName,
  findByNickName_findByNickName_user,
} from '../../src/__generated__/findByNickName';

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

const User: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> =
  ({
    data,
    paramsId,
  }: {
    data: findByNickName_findByNickName_user;
    paramsId: string;
  }) => {
    const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const [
      getUserCrew,
      {
        data: getUserCrewData,
        loading: getUserCrewLoading,
        error: getUserCrewError,
      },
    ] = useLazyQuery<getUserCrew, getUserCrewVariables>(GET_USER_CREW, {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'network-only',
    });

    useEffect(() => {
      getUserCrew({
        variables: {
          nickname: user.nickname,
        },
      });
    }, [user]);

    const onClick = () => {
      dispatch(setModal(true));
    };

    if (getUserCrewLoading) return <div>Loading..</div>;

    return (
      <>
        <div className={UserStyle.userContainer}>
          <UserProfile userNick={paramsId} />
          <div>
            {getUserCrewData &&
              getUserCrewData?.getUserCrew?.crews?.map((el) => (
                <li key={el.id}>{el.name}</li>
              ))}
          </div>
        </div>
        <UploadModal />
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

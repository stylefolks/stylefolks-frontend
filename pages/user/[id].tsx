import { useLazyQuery } from '@apollo/client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserCrew,
  getUserCrewVariables,
} from 'src/__generated__/getUserCrew';
import { RootState } from 'store/modules';
import UserStyle from 'styles/User.module.scss';
import { FIND_BY_NICKNAME, GET_USER_CREW } from '../../graphql/queries';
import { useMe } from '../../hooks/useMe';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';
import vacantImage from '../../public/solidwhite.png';
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
    const router = useRouter();
    const { data: loginUserData, loading, error } = useMe();
    const [isUser, setIsUser] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [imgUrl, setImageUrl] = useState<string>('');
    const { isPhotoUploadActive } = useSelector(
      (state: RootState) => state.user
    );
    const dispatch = useDispatch();
    // const {isPhotoUploadActive}= user;

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

        getUserCrew({
          variables: {
            nickname: data?.nickname,
          },
        });
      }
    }, [loginUserData]);

    const onUpload = () => {
      console.log('upload image');
    };
    const onDelete = () => {
      console.log('delete image');
    };
    const onMouseDown = (setting: boolean) => {
      setIsActive(setting);
    };

    const uploadImage = async (formBody) => {
      console.log('Form BODY', formBody);

      const { url } = await (
        await fetch('http://localhost:4000/images/user', {
          method: 'POST',
          body: formBody,
        })
      ).json();
      setImageUrl(url);
      console.log(url);
    };

    const onImageChange = (e) => {
      console.log('...???', e);
      if (e.target.files && e.target.files[0]) {
        let img = e.target.files[0];
        const formBody = new FormData();
        formBody.append('file', img);
        uploadImage(formBody);
        console.log('@@@@@ IMAGE CHANGE', URL.createObjectURL(img));
      }
    };

    if (getUserCrewLoading) return <div>Loading..</div>;

    console.log(getUserCrewError, getUserCrewData);
    return (
      <>
        <div className={UserStyle.userContainer}>
          <div className={UserStyle.userInfoWrapper}>
            <div
              className={UserStyle.userImageWrapper}
              onMouseEnter={() => onMouseDown(true)}
              onMouseLeave={() => onMouseDown(false)}
            >
              <Image
                src={imgUrl ? imgUrl : vacantImage}
                // src={data?.profileImg ? data?.profileImg : vacantImage}
                alt="profile-image"
                width="120px"
                height="120px"
              />
              {true && (
                <>
                  <input
                    type="file"
                    // accept="image/*"
                    name="profileImage"
                    onChange={onImageChange}
                    // {...register('file', { required: true })}
                  />
                  <button onClick={onDelete}>delete</button>
                </>
              )}
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

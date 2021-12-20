import { useLazyQuery, useMutation, useReactiveVar } from '@apollo/client';
import {
  faArrowCircleLeft,
  faClone,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userInfoVar } from 'cache/common/common.cache';
import {
  isUserTotalPostVar,
  isVisibleEditProfileModalVar,
  isVisibleProfileImageModalVar,
} from 'cache/user/user.cache';
import SmallCircleProfile from 'components/common/SmallCircleProfile';
import PageChange from 'components/pageChange/PageChange';
import { EDIT_PROFILE } from 'graphql/mutations';
import { GET_USER_CREW } from 'graphql/queries';
import Image from 'next/image';
import { useRouter } from 'next/router';
import vacantImage from 'public/vacantImage.png';
import React, { useEffect, useState } from 'react';
import {
  editProfile,
  editProfileVariables,
} from 'src/__generated__/editProfile';
import { findByNickName_findByNickName_user } from 'src/__generated__/findByNickName';
import {
  getUserCrew,
  getUserCrewVariables,
} from 'src/__generated__/getUserCrew';
import UserStyle from 'styles/User.module.scss';

interface IUserProfileProps {
  pageUserData: findByNickName_findByNickName_user;
}

const UserProfile: React.FC<IUserProfileProps> = ({ pageUserData }) => {
  const router = useRouter();
  const user = useReactiveVar(userInfoVar);

  const [isChange, setIsChange] = useState<boolean>(false);
  const [localVal, setLocalVal] = useState({ nick: '', link: '' });
  const [isUser, setIsUser] = useState<boolean>(false);

  const onCompleted = (data: editProfile) => {
    if (data.editProfile.ok) {
      userInfoVar({
        ...user,
        link: localVal.link,
        nickname: localVal.nick,
      });
      setIsChange(false);
      router.push(`/user/${localVal.nick}`);
    }
  };

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
        nickname: pageUserData?.nickname,
      },
    });
  }, [user]);

  const [editProfileMutation, { data, loading, error }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE, {
    onCompleted,
  });

  useEffect(() => {
    setLocalVal({
      nick: user.nickname,
      link: user.link,
    });
  }, [isChange]);

  const onClick = () => {
    isVisibleProfileImageModalVar(true);
  };

  const onEdit = () => {
    setIsChange(true);
    //여기는 유저 정보 전체 수정 가능한 모달 열리는 곳 으로 만들기
    isVisibleEditProfileModalVar(true);
  };

  useEffect(() => {
    if (user.nickname === pageUserData.nickname) setIsUser(true);
  }, []);

  if (loading) return <PageChange />;

  return (
    <>
      <div className={UserStyle.userInfoContainer}>
        <div className={UserStyle.userInfoWrapper}>
          <div
            className={UserStyle.userImageWrapper}
            onClick={isUser ? onClick : () => null}
          >
            <Image
              src={
                pageUserData?.profileImg
                  ? pageUserData?.profileImg
                  : vacantImage.src
              }
              alt="profile-image"
              width="120px"
              height="120px"
              unoptimized={true}
              placeholder="blur"
              blurDataURL={
                pageUserData?.profileImg
                  ? pageUserData?.profileImg
                  : vacantImage.src
              }
            />
          </div>
          <div className={UserStyle.userInfoBioWrapper}>
            <h4>{pageUserData?.role}</h4>
            <h2> {pageUserData?.nickname}</h2>
            <a href={pageUserData?.link} target="_blank" rel="noreferrer">
              Link Of {pageUserData?.nickname}
            </a>
          </div>
        </div>
        {isUser && (
          <div className={UserStyle.userProfileButtonContainer}>
            <button>
              <FontAwesomeIcon icon={faUserCog} size="2x" onClick={onEdit} />
            </button>
            {isUserTotalPostVar() ? (
              <button>
                <FontAwesomeIcon
                  icon={faArrowCircleLeft}
                  size="2x"
                  onClick={() => isUserTotalPostVar(!isUserTotalPostVar())}
                />
              </button>
            ) : (
              <button>
                <FontAwesomeIcon
                  icon={faClone}
                  size="2x"
                  onClick={() => isUserTotalPostVar(!isUserTotalPostVar())}
                />
              </button>
            )}
          </div>
        )}
      </div>
      <div className={UserStyle.userJoinCrewContainer}>
        {getUserCrewData?.getUserCrew.crews?.length ? <h4>Joined Crew</h4> : ''}
        <ul>
          {getUserCrewData?.getUserCrew.crews?.length
            ? getUserCrewData?.getUserCrew?.crews?.map((el) => (
                <SmallCircleProfile
                  link={`/crew/${el.name}`}
                  key={el.id}
                  name={el.name}
                  profileImg={el.profileImg}
                />
              ))
            : ''}
        </ul>
      </div>
    </>
  );
};

export default UserProfile;

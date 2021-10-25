import { useLazyQuery, useMutation, useReactiveVar } from '@apollo/client';
import { Button } from 'components/common/Button';
import { EDIT_PROFILE } from 'graphql/mutations';
import { GET_USER_CREW } from 'graphql/queries';
import { isUserTotalPost, userInfoVar } from 'lib/apolloClient';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  editProfile,
  editProfileVariables,
} from 'src/__generated__/editProfile';
import { findByNickName_findByNickName_user } from 'src/__generated__/findByNickName';
import {
  getUserCrew,
  getUserCrewVariables,
} from 'src/__generated__/getUserCrew';
import { setModal } from 'store/modules/commonReducer';
import UserStyle from 'styles/User.module.scss';

interface IUserProfileProps {
  pageUserData: findByNickName_findByNickName_user;
}

const UserProfile: React.FC<IUserProfileProps> = ({ pageUserData }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useReactiveVar(userInfoVar);

  const [isChange, setIsChange] = useState<boolean>(false);
  const [localVal, setLocalVal] = useState({ nick: '', link: '' });
  const [isUser, setIsUser] = useState<boolean>(false);

  const onCompleted = (data: editProfile) => {
    if (data.editProfile.ok) {
      userInfoVar({
        ...userInfoVar(),
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
        nickname: pageUserData.nickname,
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
    dispatch(setModal(true));
  };

  const onEdit = () => {
    setIsChange(true);
  };

  const onSave = () => {
    editProfileMutation({
      variables: {
        input: {
          link: localVal.link,
          nickname: localVal.nick,
        },
      },
    });
  };

  useEffect(() => {
    if (user.nickname === pageUserData.nickname) setIsUser(true);
  }, []);

  return (
    <>
      <div className={UserStyle.userInfoContainer}>
        <div className={UserStyle.userInfoWrapper}>
          <div
            className={UserStyle.userImageWrapper}
            onClick={isUser ? onClick : () => null}
          >
            <Image
              src={pageUserData?.profileImg}
              alt="profile-image"
              width="120px"
              height="120px"
              unoptimized={true}
              placeholder="blur"
              blurDataURL={pageUserData?.profileImg}
            />
          </div>
          <div className={UserStyle.userInfoBioWrapper}>
            {isChange && isUser ? (
              <>
                <h4>{pageUserData?.role}</h4>
                <div>
                  <input
                    value={localVal.nick}
                    onChange={(e) =>
                      setLocalVal({ ...localVal, nick: e.target.value })
                    }
                  />
                </div>
              </>
            ) : (
              <>
                <h4>{pageUserData?.role}</h4>
                <h2> {pageUserData?.nickname}</h2>
              </>
            )}
            {isChange && isUser ? (
              <div>
                <input
                  value={localVal.link}
                  onChange={(e) =>
                    setLocalVal({ ...localVal, link: e.target.value })
                  }
                />
              </div>
            ) : (
              <a href={pageUserData?.link} target="_blank" rel="noreferrer">
                Personal Link of {pageUserData?.link}
              </a>
            )}
            {isChange ? (
              <>
                <button onClick={onSave}>Save</button>
                <button onClick={() => setIsChange(false)}>x</button>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
        {isUser && (
          <div className={UserStyle.userProfileButtonContainer}>
            <Button
              actionText="Edit Profile"
              onClick={onEdit}
              loading={false}
              canClick={true}
            />
            <Button
              actionText={
                isUserTotalPost() ? 'Back to my Profile' : 'See My Total Post'
              }
              onClick={() => isUserTotalPost(!isUserTotalPost())}
              loading={false}
              canClick={true}
            />
          </div>
        )}
      </div>
      <div className={UserStyle.userJoinCrewContainer}>
        {getUserCrewData?.getUserCrew.crews.length ? <h4>Joined Crew</h4> : ''}
        <ul>
          {getUserCrewData?.getUserCrew.crews.length
            ? getUserCrewData?.getUserCrew?.crews?.map((el) => (
                <li key={el.id}>
                  <Link href={`crew/${el.id}`}>
                    <a>
                      <div className={UserStyle.userJoinCrewImage}>
                        <Image
                          width="48px"
                          height="48px"
                          src={el.profileImg}
                          alt="crewImage"
                          placeholder="blur"
                          blurDataURL={el.profileImg}
                        />
                      </div>
                      <span>{el.name}</span>
                    </a>
                  </Link>
                </li>
              ))
            : ''}
        </ul>
      </div>
    </>
  );
};

export default UserProfile;

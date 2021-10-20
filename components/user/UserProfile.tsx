import { useLazyQuery, useMutation } from '@apollo/client';
import { Button } from 'components/common/Button';
import { EDIT_PROFILE } from 'graphql/mutations';
import { GET_USER_CREW } from 'graphql/queries';
import { useMe } from 'hooks/useMe';
import { userInfoVar } from 'lib/apolloClient';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  editProfile,
  editProfileVariables,
} from 'src/__generated__/editProfile';
import {
  getUserCrew,
  getUserCrewVariables,
} from 'src/__generated__/getUserCrew';
import { setModal } from 'store/modules/commonReducer';
import UserStyle from 'styles/User.module.scss';

interface IUserProfileProps {
  userNick: string;
}

const UserProfile: React.FC<IUserProfileProps> = ({ userNick }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: userData, loading: userLoaidng } = useMe();

  const user = userInfoVar();
  const profileImg = user?.profileImg;
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
        nickname: user.nickname,
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
    // dispatch(
    //   upadateUser({ ...user, link: localVal.link, nickname: localVal.nick })
    // );
    editProfileMutation({
      variables: {
        input: {
          // ...user,
          link: localVal.link,
          nickname: localVal.nick,
        },
      },
    });
  };

  useEffect(() => {
    if (user.nickname === userNick) setIsUser(true);
  }, []);

  return (
    <div className={UserStyle.userInfoContainer}>
      <div className={UserStyle.userInfoWrapper}>
        <div
          className={UserStyle.userImageWrapper}
          onClick={isUser ? onClick : () => null}
        >
          {!userLoaidng && (
            <Image
              src={profileImg}
              alt="profile-image"
              width="120px"
              height="120px"
            />
          )}
        </div>
        <div className={UserStyle.userInfoBioWrapper}>
          {isChange && isUser ? (
            <div>
              <input
                value={localVal.nick}
                onChange={(e) =>
                  setLocalVal({ ...localVal, nick: e.target.value })
                }
              />
            </div>
          ) : (
            <h3> {user?.nickname}</h3>
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
            <a href={user?.link} target="_blank" rel="noreferrer">
              Personal Link of {user?.link}
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
        <div>
          {getUserCrewData &&
            getUserCrewData?.getUserCrew?.crews?.map((el) => (
              <li key={el.id}>
                <div>{el.profileImg}</div>
                {el.name}
              </li>
            ))}
        </div>
      </div>
      {isUser && (
        <Button
          actionText="Edit Profile"
          onClick={onEdit}
          loading={false}
          canClick={true}
        />
      )}
    </div>
  );
};

export default UserProfile;

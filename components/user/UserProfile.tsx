import { useMutation } from '@apollo/client';
import { Button } from 'components/common/Button';
import { EDIT_PROFILE } from 'graphql/mutations';
import Image from 'next/image';
import { useRouter } from 'next/router';
import vacantImage from 'public/solidwhite.png';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  editProfile,
  editProfileVariables,
} from 'src/__generated__/editProfile';
import { RootState } from 'store/modules';
import { setModal } from 'store/modules/commonReducer';
import { upadateUser } from 'store/modules/userReducer';
import UserStyle from 'styles/User.module.scss';

interface IUserProfileProps {
  userNick: string;
}

const UserProfile: React.FC<IUserProfileProps> = ({ userNick }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.user);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [localVal, setLocalVal] = useState({ nick: '', link: '' });
  const [isUser, setIsUser] = useState<boolean>(false);

  const onCompleted = (data: editProfile) => {
    if (data.editProfile.ok) {
      router.push(`/user/${localVal.nick}`);
    }
  };

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
    dispatch(
      upadateUser({ ...user, link: localVal.link, nickname: localVal.nick })
    );
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
    <div className={UserStyle.userInfoWrapper}>
      <div
        className={UserStyle.userImageWrapper}
        onClick={isUser ? onClick : () => null}
      >
        <Image
          src={user?.profileImg ? user?.profileImg : vacantImage}
          alt="profile-image"
          width="120px"
          height="120px"
        />
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

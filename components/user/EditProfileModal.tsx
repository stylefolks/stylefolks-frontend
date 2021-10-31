import { useMutation, useReactiveVar } from '@apollo/client';
import { userInfoVar } from 'cache/common/common.cache';
import { isVisibleEditProfileModalVar } from 'cache/user/user.cache';
import BackDrop from 'components/common/BackDrop';
import { Button } from 'components/common/Button';
import { EDIT_PROFILE } from 'graphql/mutations';
import Modal from 'HOC/Modal';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  editProfile,
  editProfileVariables,
} from 'src/__generated__/editProfile';
import EditProfileModalStyle from 'styles/user/component/EditProfileModal.module.scss';

const EditProfileModal = () => {
  const router = useRouter();
  const visible = useReactiveVar(isVisibleEditProfileModalVar);
  const user = useReactiveVar(userInfoVar);
  const [localVal, setLocalVal] = useState({ nick: '', link: '' });

  const onCompleted = (data: editProfile) => {
    if (data.editProfile.ok) {
      userInfoVar({
        ...userInfoVar(),
        link: localVal.link,
        nickname: localVal.nick,
      });
      isVisibleEditProfileModalVar(false);
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
  }, [visible]);

  const onSave = () => {
    editProfileMutation({
      variables: {
        input: {
          link: localVal.link,
          nickname: localVal.nick,
          profileImg: user.profileImg,
        },
      },
    });
  };

  return (
    <Modal visible={visible}>
      <BackDrop>
        <section className={EditProfileModalStyle.container}>
          <h2>Change Your Profile</h2>
          <div className={EditProfileModalStyle.inputWrapper}>
            <label htmlFor="nickname">NickName</label>
            <input
              type="text"
              value={localVal.nick}
              onChange={(e) =>
                setLocalVal({ ...localVal, nick: e.target.value })
              }
            />
            <label htmlFor="link">Link</label>
            <input
              type="text"
              value={localVal.link}
              onChange={(e) =>
                setLocalVal({ ...localVal, link: e.target.value })
              }
            />
            <Button
              actionText="Change My Password"
              loading={false}
              canClick
              onClick={() => null}
            />
          </div>
          <div className={EditProfileModalStyle.buttonWrapper}>
            <Button
              actionText="SAVE"
              onClick={onSave}
              loading={false}
              canClick
            />
            <Button
              actionText="QUIT"
              onClick={() => isVisibleEditProfileModalVar(false)}
              loading={false}
              canClick
            />
          </div>
        </section>
      </BackDrop>
    </Modal>
  );
};

export default EditProfileModal;

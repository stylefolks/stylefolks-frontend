import { useMutation, useReactiveVar } from '@apollo/client';
import { alertVar, userInfoVar } from 'cache/common/common.cache';
import { isVisibleEditProfileModalVar } from 'cache/user/user.cache';
import BackDrop from 'components/common/BackDrop';
import { Button } from 'components/common/Button';
import { FormError } from 'components/FormError';
import { CHANGE_PASSWORD, EDIT_PROFILE } from 'graphql/mutations';
import Modal from 'HOC/Modal';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  changePassword,
  changePasswordVariables,
} from 'src/__generated__/changePassword';
import {
  editProfile,
  editProfileVariables,
} from 'src/__generated__/editProfile';
import EditProfileModalStyle from 'styles/user/component/EditProfileModal.module.scss';
import UtilStyle from 'styles/Util.module.scss';

interface IlocalPw {
  pw: string;
  changePw: string;
  checkPw: string;
}

const EditProfileModal = () => {
  const router = useRouter();
  const visible = useReactiveVar(isVisibleEditProfileModalVar);
  const user = useReactiveVar(userInfoVar);
  const [localVal, setLocalVal] = useState({ nick: '', link: '' });
  const [isChangePw, setIsChangePw] = useState<boolean>(false);
  const [localPw, setLocalPw] = useState<IlocalPw>({
    pw: '',
    changePw: '',
    checkPw: '',
  });

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

  const onCompletedChangePw = (data: changePassword) => {
    if (data.changePassword.ok) {
      alertVar({
        visible: true,
        title: '비밀번호 변경',
        content: '비밀번호 변경이 완료되었습니다.',
      });
    }
    if (data.changePassword.error) {
      alertVar({
        visible: true,
        title: '비밀번호 변경',
        content: data.changePassword.error,
      });
    }
  };

  const [
    changePasswordMutation,
    { data: changePasswordData, loading, error: changePasswordError },
  ] = useMutation<changePassword, changePasswordVariables>(CHANGE_PASSWORD, {
    onCompleted: onCompletedChangePw,
  });

  const [editProfileMutation, {}] = useMutation<
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

  const onSaveChangePassword = () => {
    changePasswordMutation({
      variables: {
        input: {
          password: localPw.pw,
          changePassword: localPw.changePw,
        },
      },
    });
  };

  const onQuit = () => {
    setLocalPw({ pw: '', changePw: '', checkPw: '' });
    setIsChangePw(false);
    isVisibleEditProfileModalVar(false);
  };

  useEffect(
    () => () => {
      onQuit();
    },
    []
  );

  return (
    <Modal visible={visible}>
      <BackDrop>
        <section className={EditProfileModalStyle.container}>
          <h2>{isChangePw ? 'Change Your Password' : 'Change Your Profile'}</h2>
          <div className={EditProfileModalStyle.inputWrapper}>
            {isChangePw ? (
              <>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="text"
                  value={user.email}
                  disabled
                  className={UtilStyle.input}
                />
                <label htmlFor="modalPassword">Current Password *</label>
                <input
                  value={localPw.pw}
                  onChange={(e) =>
                    setLocalPw({ ...localPw, pw: e.target.value })
                  }
                  placeholder="Password"
                  name="modalPassword"
                  type="password"
                  className={UtilStyle.input}
                />

                <label htmlFor="modalChangePw">Change Password *</label>
                <input
                  value={localPw.changePw}
                  onChange={(e) =>
                    setLocalPw({ ...localPw, changePw: e.target.value })
                  }
                  name="modalChangePw"
                  type="password"
                  placeholder="Type Change Password"
                  className={UtilStyle.input}
                />
                <label htmlFor="modalCheckPw">Repeat Password *</label>
                <input
                  value={localPw.checkPw}
                  onChange={(e) =>
                    setLocalPw({ ...localPw, checkPw: e.target.value })
                  }
                  name="checkChangePassword"
                  type="password"
                  required
                  placeholder="Check Change Password"
                  className={UtilStyle.input}
                />
                <div className={UtilStyle.errorFormWrapper}>
                  {localPw.checkPw !== localPw.changePw && (
                    <FormError errorMessage={'다르다'} />
                  )}
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
            <Button
              actionText={
                isChangePw
                  ? 'Back To Change Your Profile'
                  : 'Change My Password'
              }
              loading={false}
              canClick
              onClick={() => setIsChangePw((prev) => !prev)}
            />
          </div>
          <div className={EditProfileModalStyle.buttonWrapper}>
            {isChangePw ? (
              <Button
                actionText="SAVE CHANGE PASSWORD"
                onClick={onSaveChangePassword}
                loading={loading}
                canClick={!loading}
              />
            ) : (
              <>
                <Button
                  actionText="SAVE"
                  onClick={onSave}
                  loading={false}
                  canClick
                />
                <Button
                  actionText="QUIT"
                  onClick={onQuit}
                  loading={false}
                  canClick
                />
              </>
            )}
          </div>
        </section>
      </BackDrop>
    </Modal>
  );
};

export default EditProfileModal;

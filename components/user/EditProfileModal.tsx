import { Button } from 'components/common/button/Button';
import { FormError } from 'components/common/FormError';
import BackDrop from 'components/common/shared/BackDrop';
import Modal from 'HOC/Modal';
import { useLazyMe } from 'hooks/common/useMe';
import React, { useEffect } from 'react';
import UtilStyle from 'styles/common/Util.module.scss';
import EditProfileModalStyle from 'styles/user/component/EditProfileModal.module.scss';
import useEditProfileModal from './hooks/useEditProfileModal';

interface IProps {
  doRefetch: () => void;
}

const EditProfileModal = ({ doRefetch }: IProps) => {
  const [refetch] = useLazyMe();
  const doUseMeRefetch = () => {
    refetch();
  };
  const { state, actions } = useEditProfileModal({ doRefetch, doUseMeRefetch });
  const { visible, isChangePw, user, localPw, localVal, loading } = state;
  const {
    setLocalVal,
    setLocalPw,
    setIsChangePw,
    onSaveChangePassword,
    onSave,
    onQuit,
  } = actions;

  useEffect(
    () => () => {
      onQuit();
    },
    []
  );

  useEffect(() => {
    setLocalVal({
      nick: user.nickname,
      link: user.link,
    });
  }, [visible]);

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

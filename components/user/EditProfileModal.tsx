import { useReactiveVar } from '@apollo/client';
import { userInfoVar } from 'cache/common/common.cache';
import { isVisibleEditProfileModalVar } from 'cache/user/user.cache';
import BackDrop from 'components/common/shared/BackDrop';
import Modal from 'HOC/Modal';
import React, { useEffect } from 'react';
import EditProfileModalStyle from 'styles/user/component/EditProfileModal.module.scss';
import EditUserInformation from './EditUserInformation';
import EditUserPassword from './EditUserPassword';

const EditProfileModal = () => {
  const visible = useReactiveVar(isVisibleEditProfileModalVar);
  const user = useReactiveVar(userInfoVar);

  useEffect(
    () => () => {
      () => isVisibleEditProfileModalVar(false);
    },
    []
  );

  return (
    <Modal visible={visible}>
      <BackDrop>
        <section className={EditProfileModalStyle.container}>
          <h2>프로필 관리</h2>
          <EditUserPassword userEmail={user.email} />
          <EditUserInformation
            link={user.link}
            nickname={user.nickname}
            user={user}
          />
        </section>
      </BackDrop>
    </Modal>
  );
};

export default EditProfileModal;

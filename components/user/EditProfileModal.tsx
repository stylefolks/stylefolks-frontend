import BackDrop from 'components/common/shared/BackDrop';
import Modal from 'HOC/Modal';
import { useLazyMe } from 'hooks/common/useMe';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import EditProfileModalStyle from 'styles/user/component/EditProfileModal.module.scss';
import EditUserInformation from './EditUserInformation';
import EditUserPassword from './EditUserPassword';
import useEditProfileModal from './hooks/useEditProfileModal';

interface IProps {
  doRefetch: () => void;
}

interface IEditProfileForm {
  email: string;
  modalPassword: string;
  changePassword: string;
  checkChangePassword: string;
  nickname: string;
  link: string;
}

const EditProfileModal = ({ doRefetch }: IProps) => {
  const [refetch] = useLazyMe();
  const doUseMeRefetch = () => {
    refetch();
  };
  const { state, actions } = useEditProfileModal({ doRefetch, doUseMeRefetch });
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IEditProfileForm>();

  const onSubmit = () => {
    console.log(getValues()); //mutation here
  };

  const {
    modalPassword,
    changePassword,
    checkChangePassword,
    email,
    nickname,
    link,
  } = getValues();

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

  return (
    <Modal visible={visible}>
      <BackDrop>
        <section className={EditProfileModalStyle.container}>
          <h2>프로필 관리</h2>
          <EditUserPassword userEmail={user.email} />
          <EditUserInformation link={user.link} nickname={user.nickname} />
        </section>
      </BackDrop>
    </Modal>
  );
};

export default EditProfileModal;

import BackDrop from 'components/common/shared/BackDrop';
import Modal from 'HOC/Modal';
import React from 'react';
import UploadModalStyle from 'styles/upload/UploadModal.module.scss';
import useEditProfileImageModal from '../../hooks/pages/user/components/useEditProfileImageModal';

interface IEditProps {
  doRefetch: () => void;
}

const EditProfileImageModal = ({ doRefetch }) => {
  const { state, actions } = useEditProfileImageModal({ doRefetch });
  const { ref, modal } = state;
  const { onDelete, onClick, onImageChange } = actions;

  return (
    <>
      <Modal visible={modal}>
        <BackDrop>
          <section className={UploadModalStyle.uploadModalContainer}>
            <h2>프로필 이미지 변경</h2>
            <button name="upload" onClick={() => ref.current.click()}>
              새로운 이미지 등록하기
            </button>
            <button onClick={onDelete}>현재 프로필이미지 삭제하기</button>
            <button onClick={onClick}>나가기</button>
            <input
              ref={ref}
              id="uploadProfileImage"
              type="file"
              accept="image/*"
              name="profileImage"
              onChange={onImageChange}
            />
          </section>
        </BackDrop>
      </Modal>
    </>
  );
};

export default EditProfileImageModal;

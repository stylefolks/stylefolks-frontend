import BackDrop from 'components/common/BackDrop';
import Modal from 'HOC/Modal';
import React from 'react';
import UploadModalStyle from 'styles/UploadModal.module.scss';
import useEditProfileImageModal from './hooks/useEditProfileImageModal';

const EditProfileImageModal = () => {
  const { state, actions } = useEditProfileImageModal();
  const { ref, modal } = state;
  const { onDelete, onClick, onImageChange } = actions;

  return (
    <>
      <Modal visible={modal}>
        <BackDrop>
          <section className={UploadModalStyle.uploadModalContainer}>
            <h2>Change Your Profile Image</h2>
            <button name="upload" onClick={() => ref.current.click()}>
              Upload Photo
            </button>
            <button onClick={onDelete}>Remove Current Photo</button>
            <button onClick={onClick}>Cancel</button>
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
      {/* <Alert onConfirm={onConfirmAlert} /> */}
    </>
  );
};

export default EditProfileImageModal;

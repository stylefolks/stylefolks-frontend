import BackDrop from 'components/common/BackDrop';
import Modal from 'HOC/Modal';

const EditProfileModal = () => {
  return (
    <Modal visible={false}>
      <BackDrop>
        <section>
          <h2>Change Your Profile</h2>
        </section>
      </BackDrop>
    </Modal>
  );
};

export default EditProfileModal;

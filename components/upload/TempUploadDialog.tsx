import BackDrop from 'components/common/shared/BackDrop';
import Modal from 'HOC/Modal';
import React from 'react';
import UtilStyle from 'styles/common/Util.module.scss';
interface ITempUploadDialog {
  visible: boolean;
  title: string;
  content: string;
  onConfirm?: () => void | 'none';
  onCancel?: () => void | 'none';
}
const TempUploadDialog: React.FC<ITempUploadDialog> = ({
  visible,
  title,
  content,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal visible={visible}>
      <BackDrop>
        <div className={UtilStyle.alertWrapper}>
          <span>{title}</span>
          <span>{content}</span>
          <div>
            {onConfirm && <button onClick={onConfirm}>Confirm</button>}
            {onCancel && <button onClick={onCancel}>Cancel</button>}
          </div>
        </div>
      </BackDrop>
    </Modal>
  );
};

export default TempUploadDialog;

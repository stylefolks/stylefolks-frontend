import UtilStyle from 'styles/common/Util.module.scss';
import Portal from '../../HOC/Alert';
import BackDrop from './BackDrop';

interface IPropsAlert {
  visible: boolean;
  title: boolean;
  content: boolean;
  onConfirm?: () => void | 'none';
  onCancel?: () => void | 'none';
}

const Alert: React.FC<IPropsAlert> = ({
  visible,
  title,
  content,
  onConfirm,
  onCancel,
}) => {
  return (
    <>
      {visible && (
        <Portal visible={visible}>
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
        </Portal>
      )}
    </>
  );
};

export default Alert;

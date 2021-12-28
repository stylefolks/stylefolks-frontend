import { useReactiveVar } from '@apollo/client';
import { isAlertVar } from 'cache/common/common.cache';
import UtilStyle from 'styles/common/Util.module.scss';
import AlertPortal from '../../HOC/AlertPortal';
import BackDrop from './shared/BackDrop';

interface IPropsAlert {
  onConfirm?: () => void | 'none';
  onCancel?: () => void | 'none';
}

const Alert: React.FC<IPropsAlert> = ({ onConfirm, onCancel }) => {
  const alert = useReactiveVar(isAlertVar);

  return (
    <AlertPortal>
      <BackDrop>
        <div className={UtilStyle.alertWrapper}>
          <span>{alert.title}</span>
          <span>{alert.content}</span>
          <div>
            {onConfirm && <button onClick={onConfirm}>Confirm</button>}
            {
              <button
                onClick={() =>
                  isAlertVar({ visible: false, title: '', content: '' })
                }
              >
                Cancel
              </button>
            }
          </div>
        </div>
      </BackDrop>
    </AlertPortal>
  );
};

export default Alert;

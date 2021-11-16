import { useReactiveVar } from '@apollo/client';
import { alertVar } from 'cache/common/common.cache';
import UtilStyle from 'styles/common/Util.module.scss';
import Portal from '../../HOC/Alert';
import BackDrop from './BackDrop';

interface IPropsAlert {
  onConfirm?: () => void | 'none';
  onCancel?: () => void | 'none';
}

const Alert: React.FC<IPropsAlert> = ({ onConfirm, onCancel }) => {
  const alert = useReactiveVar(alertVar);

  return (
    <Portal>
      <BackDrop>
        <div className={UtilStyle.alertWrapper}>
          <span>{alert.title}</span>
          <span>{alert.content}</span>
          <div>
            {onConfirm && <button onClick={onConfirm}>Confirm</button>}
            {onCancel && <button onClick={onCancel}>Cancel</button>}
          </div>
        </div>
      </BackDrop>
    </Portal>
  );
};

export default Alert;

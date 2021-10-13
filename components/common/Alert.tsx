import { useSelector } from 'react-redux';
import Portal from '../../HOC/Portal';
import { RootState } from '../../store/modules';
import UtilStyle from '../../styles/Util.module.scss';
import BackDrop from './BackDrop';

interface IPropsAlert {
  onConfirm?: () => void | 'none';
  onCancel?: () => void | 'none';
}

const Alert: React.FC<IPropsAlert> = ({ onConfirm, onCancel }) => {
  const { alert } = useSelector((state: RootState) => state.common);

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

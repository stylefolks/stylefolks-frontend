import { useSelector } from 'react-redux';
import Portal from '../HOC/Portal';
import { RootState } from '../store/modules';
import UtilStyle from '../styles/Util.module.scss';
import BackDrop from './BackDrop';

interface IPropsAlert {
  onConfirm: () => void;
  onCancel: () => void;
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
            <button onClick={onConfirm}>Confirm</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </BackDrop>
    </Portal>
  );
};

export default Alert;

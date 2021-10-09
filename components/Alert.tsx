import { useSelector } from 'react-redux';
import Portal from '../HOC/Portal';
import { RootState } from '../store/modules';

interface IPropsAlert {
  onConfirm: () => void;
  onCancel: () => void;
}

const Alert: React.FC<IPropsAlert> = ({ onConfirm, onCancel }) => {
  const { alert } = useSelector((state: RootState) => state.common);

  return (
    <Portal>
      <span>{alert.title}</span>
      <span>{alert.content}</span>
      <button onClick={onConfirm}>확인</button>
      <button onClick={onCancel}>취소</button>
    </Portal>
  );
};

export default Alert;

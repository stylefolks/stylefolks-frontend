import { useSelector } from 'react-redux';
import Portal from '../HOC/Portal';
import { RootState } from '../store/modules';
import UtilStyle from '../styles/Util.module.scss';

const Background = () => {
  <div className="portalContainer">
    <style jsx>{`
      .portalContainer {
        position: absolute;
        right: 0px;
        left: 0px;
        bottom: 0px;
        top: 0px;
      }
    `}</style>
  </div>;
};

interface IPropsAlert {
  onConfirm: () => void;
  onCancel: () => void;
}

const Alert: React.FC<IPropsAlert> = ({ onConfirm, onCancel }) => {
  const { alert } = useSelector((state: RootState) => state.common);

  return (
    <Portal>
      <div className={UtilStyle.portalContainer}>
        <div className={UtilStyle.alertWrapper}>
          <span>{alert.title}</span>
          <span>{alert.content}</span>
          <div>
            <button onClick={onConfirm}>Confirm</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Alert;

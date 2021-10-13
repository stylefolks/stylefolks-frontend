import { ReactChild } from 'react';
import UtilStyle from '../../styles/Util.module.scss';

interface IBackDropProps {
  children: ReactChild | HTMLElement;
}

const BackDrop: React.FC<IBackDropProps> = ({ children }) => {
  return <div className={UtilStyle.portalContainer}>{children}</div>;
};

export default BackDrop;

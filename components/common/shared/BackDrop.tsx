import UtilStyle from 'styles/common/Util.module.scss';

interface IBackDropProps {
  children: React.ReactNode;
}

const BackDrop: React.FC<IBackDropProps> = ({ children }) => {
  return <div className={UtilStyle.portalContainer}>{children}</div>;
};

export default BackDrop;

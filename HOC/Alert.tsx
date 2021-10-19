import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/modules';

interface IPropsPortal {
  children: React.ReactNode;
}

const Portal: React.FC<IPropsPortal> = ({ children }) => {
  const { alert } = useSelector((state: RootState) => state.common);
  const { isVisible } = alert;
  useEffect(() => {
    isVisible && (document.body.style.overflow = 'hidden');
    !isVisible && (document.body.style.overflow = 'unset');
  }, [isVisible]);

  return isVisible
    ? createPortal(children, document.querySelector('#alert'))
    : null;
};

export default Portal;

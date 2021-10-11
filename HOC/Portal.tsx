import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/modules';

interface IPropsPortal {
  children: React.ReactNode;
}

const Portal: React.FC<IPropsPortal> = ({ children }) => {
  const { portal } = useSelector((state: RootState) => state.common);
  const { modal } = portal;

  useEffect(() => {
    modal && (document.body.style.overflow = 'hidden');
    !modal && (document.body.style.overflow = 'unset');
  }, [modal]);

  return modal
    ? createPortal(children, document.querySelector('#modal'))
    : null;
};

export default Portal;

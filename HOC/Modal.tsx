import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/modules';

interface IPropsModal {
  children: React.ReactNode;
}

const Modal: React.FC<IPropsModal> = ({ children }) => {
  const { modal } = useSelector((state: RootState) => state.common);

  useEffect(() => {
    modal && (document.body.style.overflow = 'hidden');
    !modal && (document.body.style.overflow = 'unset');
  }, [modal]);

  return modal
    ? createPortal(children, document.querySelector('#alert'))
    : null;
};

export default Modal;

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface IPropsModal {
  children: React.ReactNode;
  visible: boolean;
}

const Modal: React.FC<IPropsModal> = ({ children, visible }) => {
  useEffect(() => {
    visible && (document.body.style.overflow = 'hidden');
    !visible && (document.body.style.overflow = 'unset');
  }, [visible]);

  return visible
    ? createPortal(children, document.querySelector('#modal'))
    : null;
};

export default Modal;

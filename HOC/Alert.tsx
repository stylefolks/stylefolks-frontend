import { useReactiveVar } from '@apollo/client';
import { alertVar } from 'cache/common/common.cache';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface IPropsPortal {
  children: React.ReactNode;
}

const Portal: React.FC<IPropsPortal> = ({ children }) => {
  const alert = useReactiveVar(alertVar);
  const { visible } = alert;

  useEffect(() => {
    visible && (document.body.style.overflow = 'hidden');
    !visible && (document.body.style.overflow = 'unset');
  }, [visible]);

  return visible
    ? createPortal(children, document.querySelector('#alert'))
    : null;
};

export default Portal;

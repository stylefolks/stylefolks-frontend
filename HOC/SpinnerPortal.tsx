import { useReactiveVar } from '@apollo/client';
import { spinnerVisibleVar } from 'cache/common/common.cache';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface IPropsPortal {
  children: React.ReactNode;
}

const SpinnerPortal: React.FC<IPropsPortal> = ({ children }) => {
  const spinner = useReactiveVar(spinnerVisibleVar);

  useEffect(() => {
    spinner && (document.body.style.overflow = 'hidden');
    !spinner && (document.body.style.overflow = 'unset');
  }, [spinner]);

  return spinner
    ? createPortal(children, document.querySelector('#spinner'))
    : null;
};

export default SpinnerPortal;

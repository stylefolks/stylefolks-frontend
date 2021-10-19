import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/modules';

interface IPropsPortal {
  children: React.ReactNode;
}

const SpinnerPortal: React.FC<IPropsPortal> = ({ children }) => {
  const { spinner } = useSelector((state: RootState) => state.common);

  useEffect(() => {
    spinner && (document.body.style.overflow = 'hidden');
    !spinner && (document.body.style.overflow = 'unset');
  }, [spinner]);

  return spinner
    ? createPortal(children, document.querySelector('#spinner'))
    : null;
};

export default SpinnerPortal;

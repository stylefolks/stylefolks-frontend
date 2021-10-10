import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/modules';

const Portal = ({ children }) => {
  const { portal } = useSelector((state: RootState) => state.common);
  const { mounted } = portal;
  const dispatch = useDispatch();

  useEffect(() => {
    mounted && (document.body.style.overflow = 'hidden');
    !mounted && (document.body.style.overflow = 'unset');
  }, [mounted]);

  return mounted
    ? createPortal(children, document.querySelector('#portal'))
    : null;
};

export default Portal;

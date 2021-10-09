import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/modules';

const Portal = ({ children }) => {
  const { portal } = useSelector((state: RootState) => state.common);
  const { mounted } = portal;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setMounted(true));

  //   return () => {
  //     dispatch(setMounted(true));
  //   };
  // }, []);

  return mounted
    ? createPortal(children, document.querySelector('#portal'))
    : null;
};

export default Portal;

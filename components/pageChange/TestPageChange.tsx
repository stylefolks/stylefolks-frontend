import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackDrop from 'components/common/shared/BackDrop';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const PageChange = () => {
  return (
    <BackDrop>
      <div>
        <FontAwesomeIcon icon={faSpinner} size="10x" color="white" spin />
        <h2>We are working so hardly!</h2>
      </div>
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        h2 {
          color: white;
        }
      `}</style>
    </BackDrop>
  );
};

interface IProps {
  visible?: boolean;
}

const PageChangePortal = ({ visible }: IProps) => {
  const isVisible = visible;
  useEffect(() => {
    isVisible && (document.body.style.overflow = 'hidden');
    !isVisible && (document.body.style.overflow = 'unset');
  }, [isVisible]);

  return isVisible
    ? createPortal(<PageChange />, document.querySelector('#page-transition'))
    : null;
};

export default PageChangePortal;

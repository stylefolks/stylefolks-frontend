import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackDrop from 'components/common/BackDrop';

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

export default PageChange;

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import UtilStyle from 'styles/common/Util.module.scss';
import { IButtonProps } from './ModifyButton';

export const CancelButton: React.FC<IButtonProps> = ({ canClick, onClick }) => {
  return (
    <>
      <button
        name="deleteButtn"
        onClick={onClick}
        className={`${UtilStyle.button} ${
          canClick ? 'ableButton' : 'disabledClickButton'
        }`}
        type="submit"
      >
        <FontAwesomeIcon icon={faTimesCircle} />
      </button>
      <style jsx>{`
        button:hover {
          background-color: black;
          color: white;
        }

        .ableButton {
          background-color: white;
        }

        .disabledClickButton {
          bakcground-color: gray;
        }
      `}</style>
    </>
  );
};

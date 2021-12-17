import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import UtilStyle from 'styles/common/Util.module.scss';
export interface IButtonProps {
  canClick: boolean;
  onClick?:
    | (() => void)
    | ((e: React.MouseEvent<HTMLButtonElement>) => Promise<void>);
}

export const ModifyButton: React.FC<IButtonProps> = ({ canClick, onClick }) => {
  return (
    <>
      <button
        name="modifyButton"
        onClick={onClick}
        className={`${UtilStyle.button} ${
          canClick ? 'ableButton' : 'disabledClickButton'
        }`}
        type="submit"
      >
        <FontAwesomeIcon icon={faPen} />
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

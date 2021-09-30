import React from 'react';
import UtilStyle from '../styles/Util.module.scss';
interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
  width?: string;
  height?: string;
  fontSize?: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => {
  return (
    <>
      <button
        className={`${UtilStyle.button} ${
          canClick ? 'ableButton' : 'disabledClickButton'
        }`}
        type="submit"
      >
        {loading ? 'Loading...' : actionText}
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

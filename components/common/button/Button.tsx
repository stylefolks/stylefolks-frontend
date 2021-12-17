import React from 'react';
import UtilStyle from 'styles/common/Util.module.scss';
export interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
  width?: string;
  height?: string;
  fontSize?: string;
  onClick?:
    | (() => void)
    | ((e: React.MouseEvent<HTMLButtonElement>) => Promise<void>);
  name?: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
  onClick,
  name,
}) => {
  return (
    <>
      <button
        name={name ? name : ''}
        onClick={canClick ? onClick : () => null}
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

import React from 'react';

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
  width = '10vw',
  height = '6vh',
  fontSize = '2rem',
}) => {
  return (
    <>
      <button
        className={`${canClick ? 'ableButton' : 'disabledClickButton'}`}
        type="submit"
      >
        {loading ? 'Loading...' : actionText}
      </button>
      <style jsx>{`
        button {
          background-color: white;
          border: 1px solid black;
          width: ${width};
          height: ${height};
          font-size: ${fontSize}
          transition: all 0.5s ease-in-out;
          color: black;
          width: 100%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin: 2rem 0;
        }

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

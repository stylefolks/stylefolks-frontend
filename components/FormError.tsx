import React from 'react';

interface IFormErrorProps {
  errorMessage: string;
}

export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => {
  return (
    <>
      <span role="alert">{errorMessage}</span>
      <style jsx>{`
        span {
          padding: 0.5em 0;
          color: pink;
          font-size: 0.6rem;
        }
      `}</style>
    </>
  );
};

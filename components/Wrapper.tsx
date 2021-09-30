export default function App({ children }) {
  return (
    <main>
      {children}
      <style jsx global>{`
        * {
          font-family: GillSansMTStd-Medium, GillSans, Calibri, sans-serif,
            Menlo, Monaco, 'Lucida Console', 'Liberation Mono',
            'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New',
            monospace, serif;
        }
        body {
          margin: 0;
          font-size: 0.8rem;
          font-weight: 400;
          line-height: 1.5;
        }
        a {
          color: #22bad9;
        }
        p {
          font-size: 14px;
          line-height: 24px;
        }
        article {
          margin: 0 auto;
          max-width: 650px;
        }
        button {
          align-items: center;
          background-color: #22bad9;
          border: 0;
          color: white;
          display: flex;
          padding: 5px 7px;
          transition: background-color 0.3s;
        }
        button:active {
          background-color: #1b9db7;
        }
        button:disabled {
          background-color: #b5bebf;
        }
        button:focus {
          outline: none;
        }
        h1 {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </main>
  );
}

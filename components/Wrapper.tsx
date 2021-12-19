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
          color: black;
        }
        a:hover {
          color: #22bad9;
        }
        p {
          font-size: 14px;
          line-height: 24px;
        }
        input,
        textarea {
          appearance: none;
          -webkit-appearance: none;
          -webkit-border-radius: 0;
        }
        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
        select::-ms-expand {
          display: none;
        }

        article {
          margin: 0 auto;
          max-width: 650px;
        }
        button {
          align-items: center;
          background-color: white;
          border: 0;
          color: black;
          display: flex;
          padding: 5px 7px;
          transition: background-color 0.3s;
          cursor: pointer;
        }
        // button:active {
        //   // background-color: #1b9db7;
        // }
        button:disabled {
          background-color: #b5bebf;
        }
        button:focus {
          outline: none;
        }
        // button:hover {
        //   background-color: #22bad9;
        // }
        ul {
          padding: 0px;
          margin: 0px;
          list-style: none;
        }
        h1 {
          margin: 0;
          padding: 0;
        }

        .folks-titleImg {
          border: 3px solid #22bad9;
        }

        @media screen and (max-width: 600px) {
          .toastui-editor-popup {
            position: absolute;
            right: 0px !important;
            top: auto !important;
            left: auto !important;
          }
        }
      `}</style>
    </main>
  );
}

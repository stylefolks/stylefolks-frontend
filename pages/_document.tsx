import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div id="alert" />
          <div id="modal" />
          <div id="spinner" />
          <div id="page-transition" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

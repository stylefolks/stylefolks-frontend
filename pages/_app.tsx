import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import 'styles/globals.css';
import { createSpinner, removeSpinner } from 'utils/Utils';
import Layout from '../components/layout/Layout';
import Wrapper from '../components/Wrapper';
import { useApollo } from '../lib/apolloClient';

Router.events.on('routeChangeStart', (url) => {
  createSpinner();
});

Router.events.on('routeChangeComplete', (url) => {
  removeSpinner();
});

Router.events.on('routeChangeError', (url) => {
  removeSpinner();
  // Router.push('/');
});

const App = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps);
  return (
    <>
      <Head>
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="재미있는 패션 커뮤니티" />
          <meta name="keywords" content="패션커뮤니티" />
          <title> The-folks</title>
        </Head>
      </Head>
      <ApolloProvider client={apolloClient}>
        <Wrapper>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Wrapper>
      </ApolloProvider>
    </>
  );
};

export default App;

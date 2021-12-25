import { ApolloProvider } from '@apollo/client';
import Router from 'next/router';
import React from 'react';
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
    <ApolloProvider client={apolloClient}>
      <Wrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Wrapper>
    </ApolloProvider>
  );
};

export default App;

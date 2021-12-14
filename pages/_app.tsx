import { ApolloProvider } from '@apollo/client';
import PageChange from 'components/pageChange/PageChange';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import ReactDOM from 'react-dom';
import Layout from '../components/layout/Layout';
import Wrapper from '../components/Wrapper';
import { useApollo } from '../lib/apolloClient';
import { wrapper } from '../store';

Router.events.on('routeChangeStart', (url) => {
  document.body.classList.add('body-page-transition');
  ReactDOM.render(<PageChange />, document.getElementById('page-transition'));
});

Router.events.on('routeChangeComplete', (url) => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
  document.body.classList.remove('body-page-transition');
});

Router.events.on('routeChangeError', (url) => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
  document.body.classList.remove('body-page-transition');
  Router.push('/');
});

const DynamicSpinner = dynamic(() => import('components/common/Spinner'), {
  ssr: false,
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
      <DynamicSpinner />
    </ApolloProvider>
  );
};

export default wrapper.withRedux(App);

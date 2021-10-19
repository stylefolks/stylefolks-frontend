import { ApolloProvider } from '@apollo/client';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import { useApollo } from '../lib/apolloClient';
import { wrapper } from '../store';

const DynamicAlert = dynamic(() => import('../components/common/Alert'), {
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
      {/* <DynamicAlert /> */}
    </ApolloProvider>
  );
};

export default wrapper.withRedux(App);

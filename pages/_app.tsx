import { ApolloProvider } from '@apollo/client';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import { useApollo } from '../lib/apolloClient';
import { wrapper } from '../store';

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

export default wrapper.withRedux(App);

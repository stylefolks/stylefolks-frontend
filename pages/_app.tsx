import { ApolloProvider } from '@apollo/client';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import { useApollo } from '../lib/apolloClient';

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Wrapper>
        <Header />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Footer />
      </Wrapper>
    </ApolloProvider>
  );
}

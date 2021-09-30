import App from '../components/App';
import Header from '../components/Header';
import InfoBox from '../components/InfoBox';
import PostList from '../components/PostList';
import Submit from '../components/Submit';

const IndexPage = () => (
  <App>
    <Header />
    <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
    <Submit />
    <PostList />
  </App>
);

// export async function getStaticProps() {
//   const apolloClient = initializeApollo();

//   // await apolloClient.query({
//   //   query: ALL_POSTS_QUERY,
//   //   variables: allPostsQueryVars,
//   // });

//   // return addApolloState(apolloClient, {
//   //   props: {},
//   //   revalidate: 1,
//   // });
// }

export default IndexPage;

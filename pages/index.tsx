import InfoBox from '../components/InfoBox';
import PostList from '../components/PostList';
const IndexPage = () => {
  return (
    <>
      <InfoBox>ℹ️ Page Gonnabe beatuiful~~</InfoBox>

      <PostList />
    </>
  );
};

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

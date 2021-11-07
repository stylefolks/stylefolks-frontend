import InfoBox from '../components/InfoBox';

const IndexPage = () => {
  return (
    <>
      <InfoBox>ℹ️ Page Gonnabe beatuiful~~</InfoBox>
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

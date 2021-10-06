import { useRouter } from 'next/router';
import InfoBox from '../components/InfoBox';
import PostList from '../components/PostList';
import Submit from '../components/Submit';
const IndexPage = () => {
  const router = useRouter();

  // useEffect(() => {
  //   if (
  //     (localStorage.getItem('folks-token') && authTokenVar() === '') ||
  //     authTokenVar() === null
  //   ) {
  //     authTokenVar(localStorage.getItem('folks-token'));
  //     router.reload();
  //   }
  // }, []);

  return (
    <>
      <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
      <Submit />
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

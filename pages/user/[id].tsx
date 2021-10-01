import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { FIND_BY_ID_QUERY } from '../../graphql/queries';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';
import { findById_findById } from '../../src/__generated__/findById';

const User: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> =
  ({ data }) => {
    const { ok, error, user } = data as findById_findById;
    console.log('@@@ in comp', data?.user);
    return <div>Hello User number: {data?.user?.email}</div>;
  };

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const data: findById_findById = await apolloClient.query({
    query: FIND_BY_ID_QUERY,
    variables: {
      userId: +params?.id,
    },
  });
  console.log(data);
  if (!data.ok) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return addApolloState(apolloClient, {
    props: { data },
  });
};

export default User;

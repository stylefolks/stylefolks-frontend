import { useQuery } from '@apollo/client';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircleProfileImage from 'components/common/CircleProfileImage';
import PageChange from 'components/pageChange/PageChange';
import gql from 'graphql-tag';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getAllCrew, getAllCrewVariables } from 'src/__generated__/getAllCrew';
import UtilStyle from 'styles/common/Util.module.scss';
import CrewPageStyle from 'styles/crew/CrewPage.module.scss';
const GET_ALL_CREW = gql`
  query getAllCrew($input: GetAllCrewInput!) {
    getAllCrew(input: $input) {
      ok
      error
      totalPages
      totalResults
      crew {
        id
        profileImg
        name
        introduction
        backgroundImg
        followerCount
      }
    }
  }
`;

interface IProps {
  params: any;
}

const Crew = () => {
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  const onError = () => {
    router.push('/');
  };

  const { data, loading, error, refetch } = useQuery<
    getAllCrew,
    getAllCrewVariables
  >(GET_ALL_CREW, {
    variables: {
      input: {
        page,
        inputTake: 9 * page,
      },
    },
    onError,
  });

  if (loading) return <PageChange />;

  console.log(page, data);

  return (
    <InfiniteScroll
      dataLength={data?.getAllCrew.totalResults}
      next={() => setPage((prev) => prev + 1)}
      hasMore={page < data?.getAllCrew.totalPages}
      loader={<h1>Loading..</h1>}
      endMessage={<h4>No data</h4>}
    >
      <div className={UtilStyle.mainContainer}>
        <ul className={CrewPageStyle.crewMainPageContentsContainer}>
          {data?.getAllCrew.crew.map((el) => (
            <Link href={`/crew/${el.name}`} key={el.id}>
              <a>
                <li
                  className={CrewPageStyle.crewMainPageEachContents}
                  style={{
                    backgroundImage: `url(${
                      el.backgroundImg ? el.backgroundImg : ''
                    })`,
                  }}
                >
                  <div>
                    <CircleProfileImage profileImg={el.profileImg} />
                  </div>
                  <h2>
                    {el.name}
                    {'\u00A0'} <FontAwesomeIcon icon={faUser} />
                    {el.followerCount}
                  </h2>
                  {/* <h3></h3> */}
                </li>
              </a>
            </Link>
          ))}
        </ul>
      </div>
    </InfiniteScroll>
  );
};

// export const getStaticProps: GetStaticProps<IProps> = async ({ params }) => {
//   const apolloClient = initializeApollo();

//   const data = await apolloClient.query({
//     query: GET_ALL_CREW,
//     variable: {
//       input: {
//         page: 1,
//         inputTake: 9,
//       },
//     },
//   });

//   console.log(data);

//   return addApolloState(apolloClient, {
//     props: {
//       initialData: data,
//     },
//   });
// };

export default Crew;

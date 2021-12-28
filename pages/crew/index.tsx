import { ApolloError, useLazyQuery } from '@apollo/client';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircleProfileImage from 'components/common/CircleProfileImage';
import { GET_ALL_CREW } from 'graphql/crew/queries';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  getAllCrew,
  getAllCrewVariables,
  getAllCrew_getAllCrew_crew,
} from 'src/__generated__/getAllCrew';
import CrewPageStyle from 'styles/crew/CrewPage.module.scss';
import NoMore from '../../components/common/NoMore';

const Crew: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> =
  ({ data: initialData }) => {
    const [page, setPage] = useState<number>(2);
    const [data, setData] = useState<getAllCrew_getAllCrew_crew[]>(
      initialData?.getAllCrew.crew
    );

    const router = useRouter();
    const onError = (error: ApolloError) => {
      alert(error);
      router.push('/');
    };

    const onCompleted = (data: getAllCrew) => {
      if (data.getAllCrew.ok) {
        setData((prev) => [...prev, ...moreData?.getAllCrew.crew]);
      }
    };

    const [getCrewData, { data: moreData, loading, error, refetch }] =
      useLazyQuery<getAllCrew, getAllCrewVariables>(GET_ALL_CREW, {
        onError,
        onCompleted,
      });

    const getMorePost = async (_page: number) => {
      getCrewData({
        variables: {
          input: {
            page: _page,
            inputTake: 9,
          },
        },
      });
    };

    useEffect(() => {
      getMorePost(page);
    }, [page]);

    return (
      <InfiniteScroll
        dataLength={data.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={data.length < initialData?.getAllCrew.totalResults}
        loader={<h1>Loading..</h1>}
        endMessage={<NoMore text={'Crew End'} />}
      >
        <ul className={CrewPageStyle.crewMainPageContentsContainer}>
          {data?.map((el, index) => (
            <Link href={`/crew/${el.name}`} key={el.id + el.name + index}>
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
                </li>
              </a>
            </Link>
          ))}
        </ul>
      </InfiniteScroll>
    );
  };

export const getServerSideProps: GetServerSideProps<{ data: getAllCrew }> =
  async () => {
    const apolloClient = initializeApollo();

    const data: { data: getAllCrew } = await apolloClient.query({
      query: GET_ALL_CREW,
      variables: {
        input: {
          page: 1,
          inputTake: 9,
        },
      },
    });

    return addApolloState(apolloClient, {
      props: {
        data: data.data,
      },
    });
  };

export default Crew;

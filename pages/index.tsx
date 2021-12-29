import { GET_ALL_POSTS_QUERY } from 'graphql/post/queries';
import useMain from 'hooks/pages/main/useMain';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getAllPosts } from 'src/__generated__/getAllPosts';
import MainStyle from 'styles/main/MainPage.module.scss';
import NoMore from '../components/common/NoMore';

const IndexPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data: initialData }) => {
  const { state, actions } = useMain({ initialData });
  const { data } = state;
  const { setPage } = actions;

  return (
    <>
      <title>The Folks</title>
      <InfiniteScroll
        dataLength={data.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={data.length < initialData?.getAllPosts.totalResults}
        loader={<h1>Loading..</h1>}
        endMessage={<NoMore text={'Posts End'} />}
        style={{ position: 'relative' }}
      >
        <ul className={MainStyle.cardsContainer}>
          {data.map((el) => (
            <Link href={`/post/${el.id}`} key={el.id}>
              <a>
                <li>
                  <div>
                    <Image
                      alt={el.title}
                      src={el.titleImg}
                      layout="responsive"
                      width={512}
                      height={512}
                      objectFit="cover"
                      objectPosition="center"
                      blurDataURL={el.titleImg}
                      placeholder="blur"
                      quality={50}
                    />
                  </div>
                </li>
              </a>
            </Link>
          ))}
        </ul>
      </InfiniteScroll>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{ data: getAllPosts }> =
  async () => {
    const apolloClient = initializeApollo();
    const data: { data: getAllPosts } = await apolloClient.query({
      query: GET_ALL_POSTS_QUERY,
      variables: {
        input: {
          page: 1,
          inputTake: 13,
        },
      },
    });

    return addApolloState(apolloClient, {
      props: {
        data: data.data,
      },
    });
  };

export default IndexPage;

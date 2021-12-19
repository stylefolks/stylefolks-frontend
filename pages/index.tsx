import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import VacantImage from 'public/vacantImage.png';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  getAllPosts,
  getAllPostsVariables,
  getAllPosts_getAllPosts_post,
} from 'src/__generated__/getAllPosts';
import UtilStyle from 'styles/common/Util.module.scss';
import MainStyle from 'styles/main/MainPage.module.scss';
import NoMore from '../components/common/NoMore';

const GET_ALL_POSTS_QUERY = gql`
  query getAllPosts($input: GetAllPostsInput!) {
    getAllPosts(input: $input) {
      ok
      error
      post {
        id
        title
        titleImg
        user {
          id
          nickname
        }
        viewCount
      }
      totalPages
      totalResults
    }
  }
`;

const IndexPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data: initialData }) => {
  const [page, setPage] = useState<number>(2);
  const [data, setData] = useState<getAllPosts_getAllPosts_post[]>(
    initialData.getAllPosts.post
  );

  const router = useRouter();

  const onCompleted = (data: getAllPosts) => {
    if (data.getAllPosts.ok) {
      setData((prev) => [...prev, ...moreData?.getAllPosts.post]);
    }
  };

  const onError = () => {
    console.log('메인 페이지 알 수 없는 에러 발생');
    router.push('/');
  };

  const [getAllPostsData, { data: moreData, loading, error, refetch }] =
    useLazyQuery<getAllPosts, getAllPostsVariables>(GET_ALL_POSTS_QUERY, {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'network-only',
      onError,
      onCompleted,
    });

  const getMorePost = async (_page: number) => {
    if (_page == 1) {
      return;
    }
    getAllPostsData({
      variables: {
        input: {
          page: _page,
          inputTake: 13,
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
      hasMore={data.length < initialData?.getAllPosts.totalResults}
      loader={<h1>Loading..</h1>}
      endMessage={<NoMore text={'No More Posts 😅'} />}
      style={{ position: 'relative' }}
    >
      {/* <div className={MainStyle.titleTextContainer}>
        <div>
          <h1 className={MainStyle.titleText}>The Folks</h1>
          <h1 className={MainStyle.titleText}>
            The Advanced Fashion Community
          </h1>
        </div>
      </div> */}
      <ul className={MainStyle.cardsContainer}>
        {data.map((el) => (
          <Link href={`/post/${el.id}`} key={el.id}>
            <a>
              <li>
                <div className={UtilStyle.imageSquareContainer}>
                  <Image
                    alt={el.title}
                    src={el.titleImg || VacantImage}
                    layout="fill"
                  />
                </div>
              </li>
            </a>
          </Link>
        ))}
      </ul>
    </InfiniteScroll>
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

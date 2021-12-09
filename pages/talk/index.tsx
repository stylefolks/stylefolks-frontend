import { useLazyQuery } from '@apollo/client';
import { GET_POST_BY_CATEGORY } from 'graphql/queries';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import NoMore from 'pages/crew/components/NoMore';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  getPostByCategory,
  getPostByCategoryVariables,
  getPostByCategory_getPostByCategory_post,
} from 'src/__generated__/getPostByCategory';
import { FirstCategoryName } from 'src/__generated__/globalTypes';
import TalkStyle from 'styles/talk/TalkPage.module.scss';
import TalkColumn from './components/TalkColumn';

const Talk: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data: initialData,
}) => {
  const router = useRouter();
  const [page, setPage] = useState<number>(2);
  const [data, setData] = useState<getPostByCategory_getPostByCategory_post[]>(
    initialData.getPostByCategory.post
  );

  const onCompleted = (data: getPostByCategory) => {
    if (data?.getPostByCategory?.ok) {
      setData((prev) => [...prev, ...moreData?.getPostByCategory.post]);
    }
  };

  const onError = () => {
    router.push('/');
  };

  const [getTalkData, { data: moreData, loading, error }] = useLazyQuery<
    getPostByCategory,
    getPostByCategoryVariables
  >(GET_POST_BY_CATEGORY, { onError, onCompleted });

  const getMorePost = async (_page: number) => {
    getTalkData({
      variables: {
        input: {
          page: _page,
          inputTake: 9,
          firstCategoryName: FirstCategoryName.TALK,
        },
      },
    });
  };

  useEffect(() => {
    getMorePost(page);
  }, [page]);

  console.log(initialData.getPostByCategory.post);

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={() => setPage((prev) => prev + 1)}
      hasMore={page < initialData?.getPostByCategory.totalPages}
      loader={<h1>Loading..</h1>}
      endMessage={<NoMore text={'No More Talks 😅'} />}
      style={{ width: '100%' }}
    >
      <h2>Talks!</h2>
      <ul className={TalkStyle.cardContainer}>
        {data?.map((el) => (
          <TalkColumn data={el} key={el.id} />
        ))}
      </ul>
    </InfiniteScroll>
  );
};

export const getStaticProps: GetStaticProps<{ data: getPostByCategory }> =
  async (ctx) => {
    const apolloClient = initializeApollo(ctx);
    const data: { data: getPostByCategory } = await apolloClient.query({
      query: GET_POST_BY_CATEGORY,
      variables: {
        input: {
          page: 1,
          inputTake: 9,
          firstCategoryName: FirstCategoryName.TALK,
        },
      },
    });

    return addApolloState(apolloClient, {
      props: {
        data: data.data,
      },
    });
  };

export default Talk;

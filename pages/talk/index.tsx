import { ApolloError, useLazyQuery } from '@apollo/client';
import NoMore from 'components/common/NoMore';
import { GET_POST_BY_CATEGORY } from 'graphql/post/queries';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  getPostByCategory,
  getPostByCategoryVariables,
  getPostByCategory_getPostByCategory_post,
} from 'src/__generated__/getPostByCategory';
import { FirstCategoryName } from 'src/__generated__/globalTypes';
import TalkStyle from 'styles/talk/TalkPage.module.scss';
import TalkColumn from '../../components/talk/TalkColumn';

const Talk: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> =
  ({ data: initialData }) => {
    const router = useRouter();
    const [page, setPage] = useState<number>(2);
    const [data, setData] = useState<
      getPostByCategory_getPostByCategory_post[]
    >(initialData.getPostByCategory.post);

    const onCompleted = (data: getPostByCategory) => {
      if (data?.getPostByCategory?.ok) {
        setData((prev) => [...prev, ...moreData?.getPostByCategory.post]);
      }
    };

    const onError = (error: ApolloError) => {
      alert(error);
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

    return (
      <>
        <title>The Folks | Talk</title>

        <InfiniteScroll
          dataLength={data.length}
          next={() => setPage((prev) => prev + 1)}
          hasMore={page < initialData?.getPostByCategory.totalPages}
          loader={<h1>Loading..</h1>}
          endMessage={<NoMore text={'Talks End'} />}
          style={{ width: '100%' }}
        >
          <h1>Talks</h1>
          <ul className={TalkStyle.cardContainer}>
            {data?.map((el) => {
              const { id, title, titleImg, contents, createdAt, viewCount } =
                el;
              const commentsLength = el.comments.length;
              const nickname = el.user.nickname;

              return (
                <TalkColumn
                  key={id}
                  id={id}
                  title={title}
                  titleImg={titleImg}
                  contents={contents}
                  createdAt={createdAt}
                  viewCount={viewCount}
                  commentsLength={commentsLength}
                  nickname={nickname}
                />
              );
            })}
          </ul>
        </InfiniteScroll>
      </>
    );
  };

export const getServerSideProps: GetServerSideProps<{
  data: getPostByCategory;
}> = async () => {
  const apolloClient = initializeApollo();
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

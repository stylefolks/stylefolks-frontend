import { ApolloError, useLazyQuery } from '@apollo/client';
import NoMore from 'components/common/NoMore';
import TalkColumn from 'components/talk/TalkColumn';
import { GET_POST_BY_CATEGORY } from 'graphql/post/queries';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  getPostByCategory,
  getPostByCategoryVariables,
  getPostByCategory_getPostByCategory_post,
} from 'src/__generated__/getPostByCategory';
import {
  FirstCategoryName,
  SecondCategoryName,
} from 'src/__generated__/globalTypes';
import ColumnStyle from 'styles/column/ColumnPage.module.scss';

const ColumnDetail: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data: initialData, secondCategoryName }) => {
  console.log(initialData);

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

  const onError = (error: ApolloError) => {
    alert(error);
    router.push('/');
  };

  const [getPostByCategoryData, { data: moreData, loading, error }] =
    useLazyQuery<getPostByCategory, getPostByCategoryVariables>(
      GET_POST_BY_CATEGORY,
      {
        onError,
        onCompleted,
      }
    );

  useEffect(() => {
    const getMorePost = async (_page: number) => {
      getPostByCategoryData({
        variables: {
          input: {
            page: _page,
            inputTake: 9,
            firstCategoryName:
              secondCategoryName === SecondCategoryName.CHALLENGE
                ? FirstCategoryName.TALK
                : FirstCategoryName.COLUMN,
            secondCategoryName,
          },
        },
      });
    };
    getMorePost(page);
  }, [page]);

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={() => setPage((prev) => prev + 1)}
      hasMore={page < initialData?.getPostByCategory.totalPages}
      loader={<h1>Loading..</h1>}
      endMessage={<NoMore text={'Column End'} />}
    >
      <div style={{ display: 'flex' }}>
        <Link href="/column">
          <a>
            <h1>Column</h1>
          </a>
        </Link>
        <h1>{'>'}</h1>
        <Link href="/column">
          <a>
            <h1>{secondCategoryName}</h1>
          </a>
        </Link>
      </div>

      <ul className={ColumnStyle.cardContainer}>
        {data?.map((el, index) => {
          const {
            id,
            title,
            createdAt,
            comments,
            contents,
            viewCount,
            titleImg,
            user,
          } = el;

          return (
            <TalkColumn
              id={id}
              key={id}
              title={title}
              createdAt={createdAt}
              commentsLength={comments.length}
              contents={contents}
              viewCount={viewCount}
              titleImg={titleImg}
              nickname={user.nickname}
            />
          );
        })}
      </ul>
    </InfiniteScroll>
  );
};

export const getServerSideProps: GetServerSideProps<{
  data: getPostByCategory;
  secondCategoryName: SecondCategoryName;
}> = async (context) => {
  const acceptArr = [
    SecondCategoryName.CHALLENGE,
    SecondCategoryName.USER_COLUMN,
  ];
  const secondCategoryName = context.query.id as SecondCategoryName;

  if (!acceptArr.includes(secondCategoryName)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const apolloClient = initializeApollo();
  const data: { data: getPostByCategory } = await apolloClient.query({
    query: GET_POST_BY_CATEGORY,
    variables: {
      input: {
        page: 1,
        inputTake: 9,
        firstCategoryName:
          secondCategoryName === SecondCategoryName.CHALLENGE
            ? FirstCategoryName.TALK
            : FirstCategoryName.COLUMN,
        secondCategoryName,
      },
    },
  });

  return addApolloState(apolloClient, {
    props: {
      data: data.data,
      secondCategoryName,
    },
  });
};

export default ColumnDetail;

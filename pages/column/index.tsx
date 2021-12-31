import TalkColumn from 'components/talk/TalkColumn';
import { GET_POST_BY_CATEGORY } from 'graphql/post/queries';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import React from 'react';
import { getPostByCategory } from 'src/__generated__/getPostByCategory';
import {
  FirstCategoryName,
  SecondCategoryName,
} from 'src/__generated__/globalTypes';
import ColumnStyle from 'styles/column/ColumnPage.module.scss';
import UtilStyle from 'styles/common/Util.module.scss';

const Column: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> =
  ({ data: { columnData, challengeData } }) => {
    return (
      <>
        <title>The Folks | Column</title>
        <section className={UtilStyle.container}>
          <div>
            <div className={ColumnStyle.moreButtonWrapper}>
              <h1>Column</h1>
              <Link href={`column/${SecondCategoryName.USER_COLUMN}`}>
                <a>See More</a>
              </Link>
            </div>
            <ul>
              {columnData?.getPostByCategory.post.map((el) => {
                const {
                  id,
                  comments,
                  contents,
                  createdAt,
                  title,
                  titleImg,
                  user,
                  viewCount,
                } = el;
                const { nickname } = user;
                return (
                  <TalkColumn
                    key={id}
                    id={id}
                    commentsLength={comments.length}
                    contents={contents}
                    createdAt={createdAt}
                    title={title}
                    titleImg={titleImg}
                    viewCount={viewCount}
                    nickname={nickname}
                  />
                );
              })}
            </ul>
          </div>

          <div>
            <div className={ColumnStyle.moreButtonWrapper}>
              <h1>Challenge</h1>
              <Link href={`column/${SecondCategoryName.CHALLENGE}`}>
                <a>See More</a>
              </Link>
            </div>
            <ul>
              {challengeData?.getPostByCategory.post.map((el) => {
                const {
                  id,
                  comments,
                  contents,
                  createdAt,
                  title,
                  titleImg,
                  user,
                  viewCount,
                } = el;
                const { nickname } = user;
                return (
                  <TalkColumn
                    key={id}
                    id={id}
                    commentsLength={comments.length}
                    contents={contents}
                    createdAt={createdAt}
                    title={title}
                    titleImg={titleImg}
                    viewCount={viewCount}
                    nickname={nickname}
                  />
                );
              })}
            </ul>
          </div>
        </section>
      </>
    );
  };

export const getServerSideProps: GetServerSideProps<{
  data: {
    columnData: getPostByCategory;
    challengeData: getPostByCategory;
  };
}> = async (ctx) => {
  const apolloClient = initializeApollo();
  const columnData: { data: getPostByCategory } = await apolloClient.query({
    query: GET_POST_BY_CATEGORY,
    variables: {
      input: {
        page: 1,
        inputTake: 3,
        firstCategoryName: FirstCategoryName.COLUMN,
        secondCategoryName: SecondCategoryName.USER_COLUMN,
      },
    },
  });

  const challengeData: { data: getPostByCategory } = await apolloClient.query({
    query: GET_POST_BY_CATEGORY,
    variables: {
      input: {
        page: 1,
        inputTake: 3,
        firstCategoryName: FirstCategoryName.TALK,
        secondCategoryName: SecondCategoryName.CHALLENGE,
      },
    },
  });

  return addApolloState(apolloClient, {
    props: {
      data: {
        columnData: columnData.data,
        challengeData: challengeData.data,
      },
    },
  });
};

export default Column;

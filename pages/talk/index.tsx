import NoMore from 'components/common/NoMore';
import { GET_POST_BY_CATEGORY } from 'graphql/post/queries';
import useTalk from 'hooks/pages/talk/useTalk';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getPostByCategory } from 'src/__generated__/getPostByCategory';
import { FirstCategoryName } from 'src/__generated__/globalTypes';
import UtilStyle from 'styles/common/Util.module.scss';
import TalkStyle from 'styles/talk/TalkPage.module.scss';
import TalkColumn from '../../components/talk/TalkColumn';
const Talk: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data: initialData }) => {
  const {
    state: { data, page },
    actions: { setPage },
  } = useTalk({ initialData });

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
        <h1 className={UtilStyle.mainPageTitle}>Talks</h1>
        <ul className={TalkStyle.cardContainer}>
          {data?.map((el) => {
            const { id, title, titleImg, contents, createdAt, viewCount } = el;
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

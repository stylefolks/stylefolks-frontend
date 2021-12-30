import { useQuery } from '@apollo/client';
import NoPost from 'components/common/NoPost';
import PagesDivider from 'components/common/PagesDivider';
import TalkColumn from 'components/talk/TalkColumn';
import { GET_POST_BY_CATEGORY } from 'graphql/post/queries';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  getPostByCategory,
  getPostByCategoryVariables,
} from 'src/__generated__/getPostByCategory';
import {
  FirstCategoryName,
  SecondCategoryName,
} from 'src/__generated__/globalTypes';
import CrewPageStyle from 'styles/crew/CrewPage.module.scss';

interface IPropsCrewNotice {
  crewId: number;
}

const CrewNotice: React.FC<IPropsCrewNotice> = ({ crewId }) => {
  const [page, setPage] = useState<number>(1);

  const { data, loading, error } = useQuery<
    getPostByCategory,
    getPostByCategoryVariables
  >(GET_POST_BY_CATEGORY, {
    variables: {
      input: {
        firstCategoryName: FirstCategoryName.CREW,
        secondCategoryName: SecondCategoryName.CREW_NOTICE,
        crewId,
        inputTake: 3,
        page,
      },
    },
  });

  const handlePage = (_page: number) => {
    setPage(_page);
  };

  const router = useRouter();

  return (
    <div className={CrewPageStyle.crewNoticeContainer}>
      <h2>NOTICE</h2>
      <div>
        {data?.getPostByCategory.post.length ? (
          <ul>
            {data?.getPostByCategory.post?.map((el) => {
              const { id, title, titleImg, viewCount, contents, createdAt } =
                el;
              const { nickname } = el.user;
              return (
                <TalkColumn
                  key={id}
                  id={id}
                  title={title}
                  titleImg={titleImg}
                  viewCount={viewCount}
                  contents={contents}
                  createdAt={createdAt}
                  nickname={nickname}
                />
              );
            })}
          </ul>
        ) : (
          <NoPost />
        )}
        <PagesDivider
          totalPages={data?.getPostByCategory.totalPages}
          totalResults={data?.getPostByCategory.totalResults}
          clickPage={page}
          onClick={handlePage}
        />
      </div>
    </div>
  );
};

export default CrewNotice;

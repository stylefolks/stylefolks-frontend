import { useQuery } from '@apollo/client';
import NoPost from 'components/common/NoPost';
import PagesDivider from 'components/common/PagesDivider';
import format from 'date-fns/format';
import { GET_POST_BY_CATEGORY } from 'graphql/post/queries';
import Image from 'next/image';
import { useRouter } from 'next/router';
import VacantImage from 'public/vacantImage.png';
import React, { useState } from 'react';
import {
  getPostByCategory,
  getPostByCategoryVariables,
} from 'src/__generated__/getPostByCategory';
import {
  FirstCategoryName,
  SecondCategoryName,
} from 'src/__generated__/globalTypes';
import UtilStyle from 'styles/common/Util.module.scss';
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
            {data?.getPostByCategory.post?.map((el) => (
              <li
                key={el.id}
                className={CrewPageStyle.noticeWrapper}
                onClick={() => router.push(`/post/${el.id}`)}
              >
                <div>
                  <div className={UtilStyle.imageContainer}>
                    <Image
                      className="image"
                      src={el.titleImg || VacantImage}
                      layout="fill"
                      alt={el.title}
                    />
                  </div>
                  <div className={CrewPageStyle.eachNoticeInfoWrapper}>
                    <h3>
                      DATE : {format(new Date(el.createdAt), 'yyyy-MM-dd')}
                    </h3>
                    <h3>TITLE : {el.title}</h3>
                    <h3>VIEW : {el.viewCount}</h3>
                  </div>
                </div>
                <div className={CrewPageStyle.eachNoticeWritterWrapper}>
                  <h3>By </h3>
                  <div>
                    <div className={UtilStyle.imageSmallCircleContainer}>
                      <Image
                        className="image"
                        src={el.user.profileImg || VacantImage}
                        layout="fill"
                        alt={el.user.profileImg}
                      />
                    </div>
                    <h4>{el.user.nickname}</h4>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <NoPost />
          // <div>No Post Yet</div>
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

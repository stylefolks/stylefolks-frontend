import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PagesDivider from 'components/common/PagesDivider';
import PageChange from 'components/pageChange/PageChange';
import { BUTTON_MAP } from 'constants/constants';
import { GET_POST_BY_CATEGORY } from 'graphql/post/queries';
import { IButtonMap, IPickCategory } from 'model/dto';
import React, { useEffect, useState } from 'react';
import {
  getPostByCategory,
  getPostByCategoryVariables,
} from 'src/__generated__/getPostByCategory';
import {
  FirstCategoryName,
  SecondCategoryName,
} from 'src/__generated__/globalTypes';
import GridStyle from 'styles/common/Grid.module.scss';
import UserContentsPlainTypeStyle from 'styles/user/component/UserContentsPlainType.module.scss';
import UserStyle from 'styles/user/User.module.scss';
import UserPageStyle from 'styles/user/UserPage.module.scss';
import UserContentsBlockType from './UserContentsBlockType';
import UserContentsPlainType from './UserContentsPlainType';
interface IPropsUserContents {
  nickname: string;
}

const UserContents: React.FC<IPropsUserContents> = ({ nickname }) => {
  const [pickCategory, setPickCategory] = useState<IPickCategory>({
    firstCategoryName: FirstCategoryName.TALK,
    secondCategoryName: SecondCategoryName.OOTD,
  });

  const [inputTake, setInputTake] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [isPlain, setIsPlain] = useState<boolean>(false);

  const { data, loading, error } = useQuery<
    getPostByCategory,
    getPostByCategoryVariables
  >(GET_POST_BY_CATEGORY, {
    variables: {
      input: {
        nickname,
        firstCategoryName: pickCategory.firstCategoryName,
        secondCategoryName: pickCategory.secondCategoryName,
        page,
        inputTake,
      },
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });

  const onClick = (el: IButtonMap) => {
    setPickCategory({
      firstCategoryName: el.firstCategoryName,
      secondCategoryName: el.secondCategoryName,
    });
  };

  const handlePage = (_page: number) => {
    setPage(_page);
  };

  useEffect(() => {
    if (pickCategory.secondCategoryName !== SecondCategoryName.OOTD) {
      setIsPlain(true);
      setInputTake(3);
    } else {
      setIsPlain(false);
      setInputTake(null);
    }
    setPage(1);
  }, [pickCategory]);

  if (loading) return <PageChange />;

  return (
    <div className={UserStyle.contentsSection}>
      <div className={UserStyle.categoryAllPostButton}></div>
      <div className={UserPageStyle.userContentsContainer}>
        <div className={UserStyle.userButtonWrapper}>
          {BUTTON_MAP.map((el, index) => (
            <button
              className={
                el.secondCategoryName === pickCategory.secondCategoryName
                  ? UserStyle.isActive
                  : ''
              }
              onClick={() => onClick(el)}
              key={index}
              name={
                el.secondCategoryName === null
                  ? el.firstCategoryName
                  : el.secondCategoryName
              }
            >
              <FontAwesomeIcon icon={el.icon} />
              <span>{el.name}</span>
            </button>
          ))}
        </div>
        <div className={UserStyle.userContentsWrapper}>
          <>
            <ul
              className={
                isPlain
                  ? UserContentsPlainTypeStyle.userContentsPlainList
                  : data?.getPostByCategory.totalResults > 0
                  ? GridStyle.gridContentsBlockList
                  : 'noGrid'
              }
            >
              {isPlain ? (
                <UserContentsPlainType data={data} />
              ) : (
                <UserContentsBlockType data={data} />
              )}
            </ul>
            <div className={UserPageStyle.seeMoreButton}>
              {data?.getPostByCategory.totalPages > 1 && (
                <PagesDivider
                  totalPages={data?.getPostByCategory.totalPages}
                  totalResults={data?.getPostByCategory.totalResults}
                  clickPage={page}
                  onClick={handlePage}
                />
              )}
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default UserContents;

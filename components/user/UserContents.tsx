import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PagesDivider from 'components/common/PagesDivider';
import { BUTTON_MAP } from 'constants/constants';
import { GET_POST_BY_CATEGORY } from 'graphql/queries';
import { IButtonMap, IPickCategory } from 'model/dto';
import React, { useEffect, useState } from 'react';
import { findByNickName_findByNickName_user } from 'src/__generated__/findByNickName';
import {
  getPostByCategory,
  getPostByCategoryVariables,
} from 'src/__generated__/getPostByCategory';
import {
  FirstCategoryName,
  SecondCategoryName,
} from 'src/__generated__/globalTypes';
import UserStyle from 'styles/User.module.scss';
import UserContentsPlainTypeStyle from 'styles/user/component/UserContentsPlainType.module.scss';
import UserPageStyle from 'styles/user/UserPage.module.scss';
import UserContentsBlockType from './UserContentsBlockType';
import UserContentsPlainType from './UserContentsPlainType';

interface IPropsUserContents {
  pageUserData: findByNickName_findByNickName_user;
}

const UserContents: React.FC<IPropsUserContents> = ({ pageUserData }) => {
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
        nickname: pageUserData.nickname,
        firstCategoryName: pickCategory.firstCategoryName,
        secondCategoryName: pickCategory.secondCategoryName,
        page,
        inputTake,
      },
    },
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
  }, [pickCategory]);

  useEffect(() => {
    if (pageUserData && window.scrollY) {
      window.scroll(0, 0); // reset the scroll position to the top left of the document.
    }
  }, [page]);

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
              <span>
                {el.secondCategoryName === null
                  ? el.firstCategoryName
                  : el.secondCategoryName}
              </span>
            </button>
          ))}
        </div>
        <div className={UserStyle.userContentsWrapper}>
          {loading ? (
            <div style={{ minHeight: '1024px' }}>Loading...</div>
          ) : (
            <>
              <ul
                className={
                  isPlain
                    ? UserContentsPlainTypeStyle.userContentsPlainList
                    : UserPageStyle.userContentsBlockList
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
          )}
        </div>
      </div>
    </div>
  );
};

export default UserContents;

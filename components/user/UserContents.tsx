import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BUTTON_MAP } from 'constants/constants';
import { GET_POST_BY_CATEGORY } from 'graphql/queries';
import { IButtonMap } from 'model/dto';
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
import UserContentsBlockType from './UserContentsBlockType';
import UserContentsPlainType from './UserContentsPlainType';
interface IPropsUserContents {
  pageUserData: findByNickName_findByNickName_user;
}

const UserContents: React.FC<IPropsUserContents> = ({ pageUserData }) => {
  const [pickCategory, setPickCategory] = useState<{
    firstCategoryName: FirstCategoryName;
    secondCategoryName: SecondCategoryName;
  }>({
    firstCategoryName: FirstCategoryName.TALK,
    secondCategoryName: SecondCategoryName.OOTD,
  });
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
      },
    },
  });

  const onClick = (el: IButtonMap) => {
    setPickCategory({
      firstCategoryName: el.firstCategoryName,
      secondCategoryName: el.secondCategoryName,
    });
  };

  useEffect(() => {
    if (pickCategory.secondCategoryName !== SecondCategoryName.OOTD) {
      setIsPlain(true);
    } else {
      setIsPlain(false);
    }
  }, [pickCategory]);

  return (
    <div className={UserStyle.userContentsContainer}>
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
          <ul
            className={
              isPlain
                ? UserStyle.userContentsPlainList
                : UserStyle.userContentsList
            }
          >
            {isPlain ? (
              <UserContentsPlainType data={data} />
            ) : (
              <UserContentsBlockType data={data} />
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserContents;

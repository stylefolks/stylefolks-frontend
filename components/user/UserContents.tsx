import { useQuery } from '@apollo/client';
import {
  faBookOpen,
  faPenFancy,
  faTshirt,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GET_POST_BY_CATEGORY } from 'graphql/queries';
import UseWindowDimension from 'hooks/useWindowDimension';
import { userInfoVar } from 'lib/apolloClient';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  getPostByCategory,
  getPostByCategoryVariables,
} from 'src/__generated__/getPostByCategory';
import {
  FirstCategoryName,
  SecondCategoryName,
} from 'src/__generated__/globalTypes';
import UserStyle from 'styles/User.module.scss';

interface IButtonMap {
  icon: IconDefinition;
  firstCategoryName: FirstCategoryName;
  secondCategoryName: SecondCategoryName | '';
}

const DynamicImage = dynamic(() => import('next/image'), { ssr: false });
const BUTTON_MAP: IButtonMap[] = [
  {
    icon: faTshirt,
    firstCategoryName: FirstCategoryName.TALK,
    secondCategoryName: SecondCategoryName.OOTD,
  },
  {
    icon: faPenFancy,
    firstCategoryName: FirstCategoryName.COLUMN,
    secondCategoryName: '',
  },
  {
    icon: faBookOpen,
    firstCategoryName: FirstCategoryName.FOLKS,
    secondCategoryName: SecondCategoryName.REVIEW,
  },
  {
    icon: faTshirt,
    firstCategoryName: FirstCategoryName.TALK,
    secondCategoryName: SecondCategoryName.FREE,
  },
];

const UserContents = () => {
  const user = userInfoVar();
  const [pickCategory, setPickCategory] = useState<{
    firstCategoryName: FirstCategoryName;
    secondCategoryName: SecondCategoryName | '';
  }>({
    firstCategoryName: FirstCategoryName.TALK,
    secondCategoryName: SecondCategoryName.OOTD,
  });
  const { width, height } = UseWindowDimension();
  const widhtCondition = width > 735;
  const { data, loading, error } = useQuery<
    getPostByCategory,
    getPostByCategoryVariables
  >(GET_POST_BY_CATEGORY, {
    variables: {
      input: {
        userId: user.id,
        firstCategoryName: pickCategory.firstCategoryName,
        secondCategoryName:
          pickCategory.secondCategoryName === ''
            ? null
            : pickCategory.secondCategoryName,
      },
    },
  });

  const onClick = (el: IButtonMap) => {
    setPickCategory({
      firstCategoryName: el.firstCategoryName,
      secondCategoryName: el.secondCategoryName,
    });
  };

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
              el.secondCategoryName === ''
                ? el.firstCategoryName
                : el.secondCategoryName
            }
          >
            <FontAwesomeIcon icon={el.icon} />
            <span>
              {el.secondCategoryName === ''
                ? el.firstCategoryName
                : el.secondCategoryName}
            </span>
          </button>
        ))}
      </div>
      <div className={UserStyle.userContentsWrapper}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className={UserStyle.userContentsList}>
            {data.getPostByCategory.totalResults === 0 ? (
              <div className={UserStyle.noStory}>No Story Yet 😭</div>
            ) : (
              data?.getPostByCategory.post.map((el) => (
                <li key={el.id}>
                  <Link href={`/post/${el.id}`}>
                    <a>
                      <DynamicImage src={el.titleImg} layout={'fill'} />
                      <span>{el.title}</span>
                    </a>
                  </Link>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserContents;

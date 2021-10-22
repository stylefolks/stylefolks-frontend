import { useQuery } from '@apollo/client';
import {
  faBookOpen,
  faCheck,
  faPenFancy,
  faTshirt,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GET_POST_BY_CATEGORY } from 'graphql/queries';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
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
interface IButtonMap {
  icon: IconDefinition;
  firstCategoryName: FirstCategoryName;
  secondCategoryName: SecondCategoryName | '';
}

interface IPropsUserContents {
  pageUserData: findByNickName_findByNickName_user;
}

// const DynamicImage = dynamic(() => import('next/image'), { ssr: false });
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

const UserContents: React.FC<IPropsUserContents> = ({ pageUserData }) => {
  const [pickCategory, setPickCategory] = useState<{
    firstCategoryName: FirstCategoryName;
    secondCategoryName: SecondCategoryName | '';
  }>({
    firstCategoryName: FirstCategoryName.TALK,
    secondCategoryName: SecondCategoryName.OOTD,
  });

  const { data, loading, error } = useQuery<
    getPostByCategory,
    getPostByCategoryVariables
  >(GET_POST_BY_CATEGORY, {
    variables: {
      input: {
        nickname: pageUserData.nickname,
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
  console.log('Master Data', data?.getPostByCategory);
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
            {!data?.getPostByCategory.post.length ? (
              <div className={UserStyle.noStory}>No Story Yet 😭</div>
            ) : (
              data?.getPostByCategory.post.map((el) => (
                <li key={el.id}>
                  <Link href={`/post/${el.id}`}>
                    <a>
                      <Image src={el.titleImg} layout={'fill'} alt="contents" />
                      <div>
                        {el.title}
                        <span>
                          <FontAwesomeIcon icon={faCheck} /> {el.viewCount}
                        </span>
                      </div>
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

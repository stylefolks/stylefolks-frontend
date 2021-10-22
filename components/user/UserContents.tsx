import { useQuery } from '@apollo/client';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BUTTON_MAP } from 'constants/constants';
import { GET_POST_BY_CATEGORY } from 'graphql/queries';
import { IButtonMap } from 'model/dto';
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
          <ul className={UserStyle.userContentsList}>
            {!data?.getPostByCategory.post.length ? (
              <div className={UserStyle.noStory}>No Story Yet 😭</div>
            ) : (
              data?.getPostByCategory.post.map((el) => (
                <li key={el.id}>
                  <Link href={`/post/${el.id}`}>
                    <a>
                      <Image
                        src={el?.titleImg}
                        layout={'fill'}
                        alt="contents"
                        placeholder="blur"
                        blurDataURL={el?.titleImg}
                      />
                      <div className={UserStyle.hiddenContentsTitle}>
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

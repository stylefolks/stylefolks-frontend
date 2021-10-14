import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMe } from '../../hooks/useMe';
import { getCategory } from '../../src/__generated__/getCategory';
import {
  FirstCategoryName,
  SecondCategoryName,
  UserRole,
} from '../../src/__generated__/globalTypes';
import { RootState } from '../../store/modules';
import { upadatePost } from '../../store/modules/uploadReducer';
import CategoryStyle from '../../styles/Category.module.scss';

const GET_CATEGORY = gql`
  query getCategory {
    getCategory {
      ok
      error
      categories {
        id
        name
        secondCategory {
          name
          id
        }
      }
    }
  }
`;

const FIRST_CATEGORY_MAP_BY_ROLE = {
  [UserRole.User]: [FirstCategoryName.TALK, FirstCategoryName.FOLKS],
  [UserRole.Publisher]: [FirstCategoryName.TALK, FirstCategoryName.COLUMN],
  [UserRole.Manager]: [
    FirstCategoryName.TALK,
    FirstCategoryName.COLUMN,
    FirstCategoryName.CREW,
  ],
  [UserRole.Brand]: [FirstCategoryName.FOLKS],
  [UserRole.Master]: [
    FirstCategoryName.TALK,
    FirstCategoryName.COLUMN,
    FirstCategoryName.CREW,
    FirstCategoryName.FOLKS,
  ],
};

const SECOND_CATEGORY_MAP_BY_ROLE = {
  [UserRole.User]: [
    SecondCategoryName.FREE,
    SecondCategoryName.OOTD,
    SecondCategoryName.REVIEW,
    SecondCategoryName.CHALLENGE,
  ],
  [UserRole.Publisher]: [
    SecondCategoryName.FREE,
    SecondCategoryName.OOTD,
    SecondCategoryName.REVIEW,
    SecondCategoryName.CHALLENGE,
    SecondCategoryName.PUBLISHER,
  ],
  [UserRole.Manager]: [
    SecondCategoryName.FREE,
    SecondCategoryName.OOTD,
    SecondCategoryName.REVIEW,
    SecondCategoryName.CHALLENGE,
  ],
  [UserRole.Brand]: [
    SecondCategoryName.ARTICLE,
    SecondCategoryName.NOTICE,
    SecondCategoryName.BRAND,
  ],
  [UserRole.Master]: [
    SecondCategoryName.FREE,
    SecondCategoryName.OOTD,
    SecondCategoryName.REVIEW,
    SecondCategoryName.CHALLENGE,
    SecondCategoryName.USER,
    SecondCategoryName.PUBLISHER,
    SecondCategoryName.ARTICLE,
    SecondCategoryName.NOTICE,
    SecondCategoryName.BRAND,
  ],
};

const NO_SECOND_CATEGORY_LIST = [
  // FirstCategoryName.COLUMN,
  FirstCategoryName.CREW,
];
interface IProps {
  role?: UserRole;
}

const CategorySelector: React.FC<IProps> = ({ role }) => {
  const dispatch = useDispatch();
  const { data: user } = useMe();
  const { post } = useSelector((state: RootState) => state.upload);

  const { data, loading, error } = useQuery<getCategory>(GET_CATEGORY, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });

  const firstCategoryArray = data?.getCategory.categories.filter((el) =>
    FIRST_CATEGORY_MAP_BY_ROLE[user?.me.role].includes(
      el.name as FirstCategoryName
    )
  );
  const secondCategoryArray = data?.getCategory.categories.filter(
    (el) => el.id === post.firstCategoryId
  );

  useEffect(() => {
    if (!loading) {
      dispatch(
        upadatePost({
          ...post,
          firstCategoryName: firstCategoryArray[0].name,
          secondCategoryName: firstCategoryArray[0]?.secondCategory[0]?.name,
          firstCategoryId: firstCategoryArray[0]?.id,
          secondCategoryId: firstCategoryArray[0]?.secondCategory[0]?.id,
        })
      );
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      dispatch(
        upadatePost({
          ...post,
          secondCategoryName: secondCategoryArray[0]?.secondCategory.filter(
            (el) => SECOND_CATEGORY_MAP_BY_ROLE[user?.me.role].includes(el.name)
          )[0]?.name,
          secondCategoryId: secondCategoryArray[0]?.secondCategory.filter(
            (el) => SECOND_CATEGORY_MAP_BY_ROLE[user?.me.role].includes(el.name)
          )[0]?.id,
        })
      );
    }
  }, [post.firstCategoryId]);

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <>
      <section className={CategoryStyle.categoryContainer}>
        <div>
          <span>Write Your Own Story named as </span>
          <input
            autoFocus={true}
            type="text"
            placeholder="Title"
            value={post.title}
            onChange={(e) =>
              dispatch(upadatePost({ ...post, title: e.target.value }))
            }
          />
          {NO_SECOND_CATEGORY_LIST.includes(
            post.firstCategoryName as FirstCategoryName
          ) ? (
            <span></span>
          ) : (
            <>
              <span> in </span>
              <select
                value={post.secondCategoryName}
                onChange={(el) => {
                  const selectedIndex = el.target.options.selectedIndex;
                  const secondCategoryId =
                    +el.target.options[selectedIndex].getAttribute('data-key');
                  dispatch(
                    upadatePost({
                      ...post,
                      secondCategoryId,
                      secondCategoryName: el.target.value,
                    })
                  );
                }}
              >
                {secondCategoryArray[0]?.secondCategory
                  .filter((el) =>
                    SECOND_CATEGORY_MAP_BY_ROLE[user?.me.role].includes(el.name)
                  )
                  .map((el) => (
                    <option key={el.id} data-key={el.id}>
                      {el.name}
                    </option>
                  ))}
              </select>
            </>
          )}

          <span> at </span>
          <select
            value={post.firstCategoryName}
            onChange={(el) => {
              const selectedIndex = el.target.options.selectedIndex;
              const firstCategoryId =
                +el.target.options[selectedIndex].getAttribute('data-key');
              dispatch(
                upadatePost({
                  ...post,
                  firstCategoryId,
                  firstCategoryName: el.target.value,
                })
              );
            }}
          >
            {firstCategoryArray.map((el) => (
              <option key={el.id} data-key={el.id}>
                {el?.name}
              </option>
            ))}
          </select>
        </div>
      </section>
    </>
  );
};

export default CategorySelector;

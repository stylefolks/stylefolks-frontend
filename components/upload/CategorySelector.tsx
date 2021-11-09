import { gql, useLazyQuery, useQuery, useReactiveVar } from '@apollo/client';
import {
  pickFirstCategoryVar,
  userInfoVar,
  writtenPostVar,
} from 'cache/common/common.cache';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategoryByFirstCategory,
  getCategoryByFirstCategoryVariables,
} from 'src/__generated__/getCategoryByFirstCategory';
import { getCategory } from '../../src/__generated__/getCategory';
import {
  FirstCategoryName,
  SecondCategoryName,
  UserRole,
} from '../../src/__generated__/globalTypes';
import { RootState } from '../../store/modules';
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

const GET_CATEGORY_BY_FIRST_CATEGORY = gql`
  query getCategoryByFirstCategory(
    $input: GetCategoryByFirstCategoryNameInput!
  ) {
    getCategoryByFirstCategory(input: $input) {
      ok
      error
      category {
        name
        secondCategory {
          name
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
    SecondCategoryName.NOTICE,
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

interface IProps {
  role?: UserRole;
}

const CategorySelector: React.FC<IProps> = ({ role }) => {
  const dispatch = useDispatch();
  const user = userInfoVar();
  const post = useReactiveVar(writtenPostVar);
  const pickFirstCategory = useReactiveVar(pickFirstCategoryVar);
  const { isModify } = useSelector((state: RootState) => state.upload);
  const { data, loading, error } = useQuery<getCategory>(GET_CATEGORY, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });

  const [getCategory, { data: differData }] = useLazyQuery<
    getCategoryByFirstCategory,
    getCategoryByFirstCategoryVariables
  >(GET_CATEGORY_BY_FIRST_CATEGORY, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });

  const firstCategoryArray = data?.getCategory.categories.filter((el) =>
    FIRST_CATEGORY_MAP_BY_ROLE[user?.role]?.includes(
      el.name as FirstCategoryName
    )
  );
  const secondCategoryArray = data?.getCategory.categories.filter(
    (el) => el.name === post.firstCategoryName
  );

  useEffect(() => {
    if (!loading && !isModify) {
      writtenPostVar({
        ...post,
        firstCategoryName: pickFirstCategoryVar(),
        secondCategoryName: firstCategoryArray[0]?.secondCategory[0]
          ?.name as SecondCategoryName,
      });
    }
  }, [loading]);

  useEffect(() => {
    if (!loading && !isModify) {
      writtenPostVar({
        ...post,
        secondCategoryName: secondCategoryArray[0]?.secondCategory.filter(
          (el) => SECOND_CATEGORY_MAP_BY_ROLE[user?.role].includes(el.name)
        )[0]?.name,
      });
    }
  }, [pickFirstCategory]);

  useEffect(() => {
    getCategory({
      variables: {
        input: {
          firstCategoryName: pickFirstCategory,
        },
      },
    });
  }, []);

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
            onChange={(e) => writtenPostVar({ ...post, title: e.target.value })}
          />
          {
            <>
              <span> in </span>
              <select
                value={post.secondCategoryName}
                onChange={(el) => {
                  const selectedIndex = el.target.options.selectedIndex;
                  writtenPostVar({
                    ...post,
                    secondCategoryName: el.target.value as SecondCategoryName,
                  });
                }}
              >
                {differData?.getCategoryByFirstCategory?.category.secondCategory.map(
                  (el) => (
                    <option key={el.name}>{el.name}</option>
                  )
                )}
              </select>
            </>
          }

          <span> at </span>
          <span>{pickFirstCategory}</span>
        </div>
      </section>
    </>
  );
};

export default CategorySelector;

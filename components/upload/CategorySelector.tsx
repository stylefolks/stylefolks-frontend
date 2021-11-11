import { gql, useQuery } from '@apollo/client';
import { writtenPostVar } from 'cache/common/common.cache';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCategoryByUserRole } from 'src/__generated__/getCategoryByUserRole';
import {
  FirstCategoryName,
  SecondCategoryName,
  UserRole,
} from '../../src/__generated__/globalTypes';
import { RootState } from '../../store/modules';
import CategoryStyle from '../../styles/Category.module.scss';

const GET_CATEGORY_BY_USER_ROLE = gql`
  query getCategoryByUserRole {
    getCategoryByUserRole {
      ok
      error
      firstCategory {
        name
        id
        secondCategory {
          id
          name
        }
      }
      brands {
        name
        id
      }
      crews {
        name
        id
      }
    }
  }
`;

interface IProps {
  role?: UserRole;
}

const CategorySelector: React.FC<IProps> = ({ role }) => {
  // const user = useReactiveVar(userInfoVar);
  const post = writtenPostVar();
  const { isModify } = useSelector((state: RootState) => state.upload);
  const { data, loading, error } = useQuery<getCategoryByUserRole>(
    GET_CATEGORY_BY_USER_ROLE
    // {
    //   fetchPolicy: 'network-only',
    //   nextFetchPolicy: 'network-only',
    // }
  );
  const secondCategoryArr = data?.getCategoryByUserRole.firstCategory.filter(
    (el) => el.name === post.firstCategoryName
  )[0].secondCategory;

  console.log('categoryData Loaded', data);
  console.log('post data Loaded', post);

  useEffect(() => {
    if (!loading && !isModify) {
      writtenPostVar({
        ...post,
        firstCategoryName: FirstCategoryName.TALK,
        secondCategoryName: SecondCategoryName.FREE,
      });
    }
  }, [loading]);

  useEffect(() => {
    writtenPostVar({
      ...post,
      secondCategoryName: secondCategoryArr && secondCategoryArr[0].name,
    });
  }, [post.firstCategoryName]);

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
          <div>
            <span>Write Your Own Story named as </span>
            <input
              autoFocus={true}
              type="text"
              placeholder="Title"
              value={post.title}
              onChange={(e) =>
                writtenPostVar({ ...post, title: e.target.value })
              }
            />
          </div>
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
                {secondCategoryArr.map((el) => (
                  <option key={el.name}>{el.name}</option>
                ))}
              </select>
            </>
          }
          <span> at </span>
          <select
            value={post.firstCategoryName}
            onChange={(el) => {
              writtenPostVar({
                ...post,
                firstCategoryName: el.target.value as FirstCategoryName,
              });
            }}
          >
            {data?.getCategoryByUserRole.firstCategory.map((el) => (
              <option key={el.name}>{el.name}</option>
            ))}
          </select>
          {post.firstCategoryName === FirstCategoryName.FOLKS && (
            <>
              <span> Of </span>
              <select>
                {data.getCategoryByUserRole.brands.map((el) => (
                  <option key={el.name}>{el.name}</option>
                ))}
              </select>
            </>
          )}

          {post.firstCategoryName === FirstCategoryName.CREW && (
            <>
              <span> Of </span>
              <select>
                {data.getCategoryByUserRole.crews.map((el) => (
                  <option key={el.name}>{el.name}</option>
                ))}
              </select>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default CategorySelector;

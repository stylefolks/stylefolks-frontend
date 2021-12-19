import { gql, useLazyQuery, useReactiveVar } from '@apollo/client';
import {
  isLoggedInVar,
  postStatusVar,
  writtenPostVar,
} from 'cache/common/common.cache';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getCategoryByUserRole } from 'src/__generated__/getCategoryByUserRole';
import {
  FirstCategoryName,
  SecondCategoryName,
  UserRole,
} from '../../src/__generated__/globalTypes';
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
  const post = writtenPostVar();
  const route = useRouter();
  const { isModify } = useReactiveVar(postStatusVar);
  const isLogin = useReactiveVar(isLoggedInVar);
  const [getCategoryByUserQuery, { data, loading, error }] =
    useLazyQuery<getCategoryByUserRole>(
      GET_CATEGORY_BY_USER_ROLE
      // {
      //   fetchPolicy: 'network-only',
      //   nextFetchPolicy: 'network-only',
      // }
    );
  const secondCategoryArr = data?.getCategoryByUserRole.firstCategory.filter(
    (el) => el.name === writtenPostVar().firstCategoryName
  )[0]?.secondCategory;

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
    if (secondCategoryArr) {
      writtenPostVar({
        ...post,
        secondCategoryName: secondCategoryArr && secondCategoryArr[0].name,
      });
    }
  }, [post.firstCategoryName]);

  useEffect(() => {
    if (isLogin) {
      getCategoryByUserQuery();
    }
  }, []);

  useEffect(() => {
    if (data?.getCategoryByUserRole) {
      if (writtenPostVar().firstCategoryName !== FirstCategoryName.FOLKS) {
        writtenPostVar({ ...writtenPostVar(), brandId: null });
      }

      if (writtenPostVar().firstCategoryName === FirstCategoryName.FOLKS) {
        writtenPostVar({
          ...writtenPostVar(),
          brandId: data?.getCategoryByUserRole.brands[0].id,
        });
      }

      if (post.firstCategoryName !== FirstCategoryName.CREW) {
        writtenPostVar({ ...writtenPostVar(), crewId: null });
      }

      if (writtenPostVar().firstCategoryName === FirstCategoryName.CREW) {
        writtenPostVar({
          ...writtenPostVar(),
          crewId: data?.getCategoryByUserRole.crews[0].id,
        });
      }
    }
  }, [post.secondCategoryName]);

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    route.reload();
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
                  writtenPostVar({
                    ...post,
                    secondCategoryName: el.target.value as SecondCategoryName,
                  });
                }}
              >
                {secondCategoryArr?.map((el) => (
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
              {/* 브랜드 */}
              <span> Of </span>
              <select
                value={
                  data.getCategoryByUserRole.brands.filter(
                    (el) => el.id === post.brandId
                  )[0]?.name
                }
                onChange={(el) => {
                  const selectedIndex = el.target.options.selectedIndex;
                  const selectElement =
                    data.getCategoryByUserRole.brands[selectedIndex];
                  writtenPostVar({ ...post, brandId: selectElement.id });
                }}
              >
                {data.getCategoryByUserRole.brands.map((el) => (
                  <option key={el.name}>{el.name}</option>
                ))}
              </select>
            </>
          )}

          {post.firstCategoryName === FirstCategoryName.CREW && (
            <>
              <span> Of </span>
              <select
                value={
                  data.getCategoryByUserRole.crews.filter(
                    (el) => el.id === post.crewId
                  )[0]?.name
                }
                onChange={(el) => {
                  const selectedIndex = el.target.options.selectedIndex;
                  const selectElement =
                    data.getCategoryByUserRole.crews[selectedIndex];

                  writtenPostVar({ ...post, crewId: selectElement.id });
                }}
              >
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

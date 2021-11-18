import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { postStatusVar, writtenPostVar } from 'cache/common/common.cache';
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
  const { isModify } = useReactiveVar(postStatusVar);

  const { data, loading, error } = useQuery<getCategoryByUserRole>(
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
    //folks, crew인 경우는 두번째 카테고리중 첫번째 값을 받아와야 함 . ->어쨌든 첫번째가 바뀌면
    // 무조건 두번째 카테고리의 첫번째값이 세팅되어야 함.
    //modify인 경우는 서버로 부터 받아온 두번째 값이 되어야함.

    writtenPostVar({
      ...post,
      secondCategoryName: secondCategoryArr && secondCategoryArr[0].name,
    });
  }, [post.firstCategoryName]);

  useEffect(() => {
    // folks, crew인 경우는 첫번째 브랜드를 받아와야 함
    //modify인 경우는 서버로 부터 받아온 브랜드나 크루값이 되어야 함.

    if (writtenPostVar().firstCategoryName !== FirstCategoryName.FOLKS) {
      writtenPostVar({ ...writtenPostVar(), brandId: null });
    }

    if (writtenPostVar().firstCategoryName === FirstCategoryName.FOLKS) {
      writtenPostVar({
        ...writtenPostVar(),
        brandId: data.getCategoryByUserRole.brands[0].id,
      });
    }

    if (post.firstCategoryName !== FirstCategoryName.CREW) {
      writtenPostVar({ ...writtenPostVar(), crewId: null });
    }

    if (writtenPostVar().firstCategoryName === FirstCategoryName.CREW) {
      writtenPostVar({
        ...writtenPostVar(),
        crewId: data.getCategoryByUserRole.crews[0].id,
      });
    }
  }, [post.secondCategoryName]);

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
                  console.log('그럼 들어가자마자 얘로 되야하는거 아닌가');
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
            onSelect={(el) => {
              console.log('@@@@@', el);
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
                  console.log(el, '생겨날때는 안되는거니 Brand');
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
                  console.log(el, '생겨날때는 안되는거니 crew');
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

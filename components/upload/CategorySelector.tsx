import { useReactiveVar } from '@apollo/client';
import {
  isLoggedInVar,
  postStatusVar,
  writtenPostVar,
} from 'cache/common/common.cache';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  getCategoryByUserRole_getCategoryByUserRole_brands,
  getCategoryByUserRole_getCategoryByUserRole_crews,
  getCategoryByUserRole_getCategoryByUserRole_firstCategory,
} from 'src/__generated__/getCategoryByUserRole';
import {
  FirstCategoryName,
  SecondCategoryName,
} from 'src/__generated__/globalTypes';
import CategoryStyle from 'styles/post/Category.module.scss';

interface IProps {
  firstCategory:
    | getCategoryByUserRole_getCategoryByUserRole_firstCategory[]
    | null;
  brands: getCategoryByUserRole_getCategoryByUserRole_brands[] | null;
  crews: getCategoryByUserRole_getCategoryByUserRole_crews[] | null;
}

const CategorySelector: React.FC<IProps> = ({
  firstCategory,
  brands,
  crews,
}) => {
  const post = writtenPostVar();
  const route = useRouter();
  const { isModify } = useReactiveVar(postStatusVar);
  const isLogin = useReactiveVar(isLoggedInVar);

  const secondCategoryArr = firstCategory?.filter(
    (el) => el.name === writtenPostVar().firstCategoryName
  )[0]?.secondCategory;

  useEffect(() => {
    if (!isModify) {
      writtenPostVar({
        ...post,
        firstCategoryName: FirstCategoryName.TALK,
        secondCategoryName: SecondCategoryName.FREE,
      });
    }
  }, [isModify]);

  useEffect(() => {
    if (secondCategoryArr) {
      writtenPostVar({
        ...post,
        secondCategoryName: secondCategoryArr && secondCategoryArr[0].name,
      });
    }
  }, [post.firstCategoryName]);

  useEffect(() => {
    if (writtenPostVar().firstCategoryName !== FirstCategoryName.FOLKS) {
      writtenPostVar({ ...writtenPostVar(), brandId: null });
    }

    if (writtenPostVar().firstCategoryName === FirstCategoryName.FOLKS) {
      writtenPostVar({
        ...writtenPostVar(),
        brandId: brands[0].id,
      });
    }

    if (post.firstCategoryName !== FirstCategoryName.CREW) {
      writtenPostVar({ ...writtenPostVar(), crewId: null });
    }

    if (writtenPostVar().firstCategoryName === FirstCategoryName.CREW) {
      writtenPostVar({
        ...writtenPostVar(),
        crewId: crews[0].id,
      });
    }
  }, [post.secondCategoryName]);

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
            {firstCategory?.map((el) => (
              <option key={el.name}>{el.name}</option>
            ))}
          </select>
          {post.firstCategoryName === FirstCategoryName.FOLKS && (
            <>
              {/* 브랜드 */}
              <span> Of </span>
              <select
                value={brands.filter((el) => el.id === post.brandId)[0]?.name}
                onChange={(el) => {
                  const selectedIndex = el.target.options.selectedIndex;
                  const selectElement = brands[selectedIndex];
                  writtenPostVar({ ...post, brandId: selectElement.id });
                }}
              >
                {brands?.map((el) => (
                  <option key={el.name}>{el.name}</option>
                ))}
              </select>
            </>
          )}

          {post.firstCategoryName === FirstCategoryName.CREW && (
            <>
              <span> Of </span>
              <select
                value={crews?.filter((el) => el.id === post.crewId)[0]?.name}
                onChange={(el) => {
                  const selectedIndex = el.target.options.selectedIndex;
                  const selectElement = crews[selectedIndex];

                  writtenPostVar({ ...post, crewId: selectElement.id });
                }}
              >
                {crews.map((el) => (
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

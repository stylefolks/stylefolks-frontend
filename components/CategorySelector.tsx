import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategory,
  getCategory_getCategory_categories,
} from '../src/__generated__/getCategory';
import { FirstCategoryName, UserRole } from '../src/__generated__/globalTypes';
import { RootState } from '../store/modules';
import { upadatePost } from '../store/modules/uploadReducer';
import CategoryStyle from '../styles/Category.module.scss';
import { Button } from './Button';

const GET_CATEGORY = gql`
  query getCategory {
    getCategory {
      ok
      error
      categories {
        id
        name
        firstCategory {
          id
          name
        }
      }
    }
  }
`;

const CATEGORY_MAP_BY_ROLE = {
  [UserRole.User]: [FirstCategoryName.TALK],
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

const CategorySelector = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { post } = useSelector((state: RootState) => state.upload);
  const [pickFirstCategory, setPickFirstCategory] = useState<FirstCategoryName>(
    FirstCategoryName.TALK
  );
  const dispatch = useDispatch();
  const { data, loading, error } = useQuery<getCategory>(GET_CATEGORY);
  let SecondCategoryArray: getCategory_getCategory_categories[];
  let FirstCategoryArray: FirstCategoryName[];

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }

  SecondCategoryArray = data?.getCategory.categories.filter(
    (el) => pickFirstCategory === el.firstCategory.name
  );
  FirstCategoryArray = [...CATEGORY_MAP_BY_ROLE[user.role]];

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
          <span> in </span>
          <select>
            {SecondCategoryArray.length === 0 ? (
              <option>NONE</option>
            ) : (
              SecondCategoryArray?.map((el) => (
                <option key={el.id}>{el.name}</option>
              ))
            )}
          </select>
          <span> at </span>
          <select
            onChange={(el) => {
              console.log('!!', el.target.value);
              setPickFirstCategory(el.target.value as FirstCategoryName);
            }}
          >
            {FirstCategoryArray.map((el, index) => (
              <option key={el + index}>{el}</option>
            ))}
          </select>
        </div>

        <Button canClick={false} actionText="Upload!" loading={false} />
        <style jsx>{`
          /* section {
          width: 100%;
          border: 1px solid black;
        } */
        `}</style>
      </section>
    </>
  );
};

export default CategorySelector;

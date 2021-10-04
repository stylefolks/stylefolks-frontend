import { gql, useQuery } from '@apollo/client';
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

const CategorySelector = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { post } = useSelector((state: RootState) => state.upload);
  const dispatch = useDispatch();
  const { data, loading, error } = useQuery<getCategory>(GET_CATEGORY);
  let SecondCategoryArray: getCategory_getCategory_categories[];
  let FirstCategoryArray;

  if (!loading) {
    console.log(data || error);
    if (user.role === UserRole.User) {
      SecondCategoryArray = data.getCategory.categories.filter(
        (el) => el.firstCategory.name === FirstCategoryName.TALK
      );
      FirstCategoryArray = [FirstCategoryName.TALK];
    }
  }

  return (
    <>
      <section className={CategoryStyle.categoryContainer}>
        <div>
          <span>Write Your Own Story named as </span>
          <input
            autoFocus={true}
            // className={`${UtilStyle.input}`}
            type="text"
            placeholder="Title"
            value={post.title}
            onChange={(e) =>
              dispatch(upadatePost({ ...post, title: e.target.value }))
            }
          />
          <span> in </span>
          <select>
            {SecondCategoryArray?.map((el) => (
              <option key={el.id}>{el.name}</option>
            ))}
          </select>
          <span> at </span>
          <select>
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

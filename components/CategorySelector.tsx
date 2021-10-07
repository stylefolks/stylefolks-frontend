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
interface IProps {
  role?: UserRole;
}

const CategorySelector: React.FC<IProps> = ({ role }) => {
  const dispatch = useDispatch();
  const { post } = useSelector((state: RootState) => state.upload);

  const { data, loading, error } = useQuery<getCategory>(GET_CATEGORY);
  let SecondCategoryArray: getCategory_getCategory_categories[];
  let FirstCategoryArray = data?.getCategory.categories; //여기는 백엔드에서 데이터를 조인해서 이쁘게 주는걸로 변경하자

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }

  SecondCategoryArray = data?.getCategory.categories.filter((el) =>
    post.firstCategoryId === null
      ? data.getCategory.categories[0].firstCategory.id === el.firstCategory.id
      : post.firstCategoryId === el.firstCategory.id
  );
  // FirstCategoryArray = [...CATEGORY_MAP_BY_ROLE[role ? role : UserRole.User]];

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
          <select
            onChange={(el) => {
              const selectedIndex = el.target.options.selectedIndex;
              const secondCategoryId =
                +el.target.options[selectedIndex].getAttribute('data-key');
              dispatch(upadatePost({ ...post, secondCategoryId }));
            }}
          >
            {SecondCategoryArray.length === 0 ? (
              <option>NONE</option>
            ) : (
              SecondCategoryArray?.map((el) => (
                <option key={el.id} data-key={el.id}>
                  {el.name}
                </option>
              ))
            )}
          </select>
          <span> at </span>
          <select
            onChange={(el) => {
              const selectedIndex = el.target.options.selectedIndex;
              const firstCategoryId =
                +el.target.options[selectedIndex].getAttribute('data-key');
              dispatch(upadatePost({ ...post, firstCategoryId }));
            }}
          >
            {data.getCategory.categories.map((el, index) => (
              <option
                key={el.firstCategory.id + index}
                data-key={el.firstCategory.id}
              >
                {el.firstCategory.name}
              </option>
            ))}
          </select>
        </div>

        {/* <Button canClick={false} actionText="Upload!" loading={false} /> */}
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

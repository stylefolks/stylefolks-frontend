import { useQuery } from '@apollo/client';
import { GET_POST_BY_CATEGORY } from 'graphql/queries';
import { userInfoVar } from 'lib/apolloClient';
import {
  getPostByCategory,
  getPostByCategoryVariables,
} from 'src/__generated__/getPostByCategory';
import {
  FirstCategoryName,
  SecondCategoryName,
} from 'src/__generated__/globalTypes';
import UserStyle from 'styles/User.module.scss';

const UserContents = () => {
  const user = userInfoVar();
  const { data, loading, error } = useQuery<
    getPostByCategory,
    getPostByCategoryVariables
  >(GET_POST_BY_CATEGORY, {
    variables: {
      input: {
        userId: user.id,
        firstCategoryName: FirstCategoryName.TALK,
        secondCategoryName: SecondCategoryName.OOTD,
      },
    },
  });

  console.log('SHOW ME DATA', data, error);

  return (
    <div className={UserStyle.userContentsContainer}>
      <div className={UserStyle.userButtonWrapper}>
        <button>OOTD</button>
        <button>COLUMN</button>
        <button>REVIEW</button>
        <button>ALL</button>
      </div>
      <div>
        <ul>
          {loading ? (
            <div>Loading..</div>
          ) : (
            data?.getPostByCategory?.post.map((el) => (
              <li key={el.id}>{el.title}</li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserContents;

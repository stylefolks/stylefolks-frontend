import { useQuery } from '@apollo/client';
import { GET_POST_BY_CATEGORY } from 'graphql/queries';
import {
  getPostByCategory,
  getPostByCategoryVariables,
} from 'src/__generated__/getPostByCategory';
import { FirstCategoryName } from 'src/__generated__/globalTypes';
import ColumnCard from './components/ColumnCard';

const Column = () => {
  const { data, loading, error } = useQuery<
    getPostByCategory,
    getPostByCategoryVariables
  >(GET_POST_BY_CATEGORY, {
    variables: {
      input: {
        page: 1,
        inputTake: 9,
        firstCategoryName: FirstCategoryName.COLUMN,
      },
    },
  });

  return (
    <div>
      Column!
      <ul>
        {data?.getPostByCategory.post.map((el) => (
          <ColumnCard data={el} />
        ))}
      </ul>
    </div>
  );
};

export default Column;

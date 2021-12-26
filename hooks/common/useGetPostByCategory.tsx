import { useQuery } from '@apollo/client';
import { GET_POST_BY_CATEGORY } from 'graphql/post/queries';
import {
  getPostByCategory,
  getPostByCategoryVariables,
} from 'src/__generated__/getPostByCategory';
import { GetPostByCategoryInput } from 'src/__generated__/globalTypes';

interface IuseGetPostByCategory {
  input: GetPostByCategoryInput;
  onCompleted: () => void;
  onError: () => void;
}

const useGetPostByCategory = ({
  input,
  onCompleted,
  onError,
}: IuseGetPostByCategory) => {
  const { data, loading, error } = useQuery<
    getPostByCategory,
    getPostByCategoryVariables
  >(GET_POST_BY_CATEGORY, {
    variables: {
      input,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
    onCompleted,
    onError,
  });

  return {
    data,
    loading,
    error,
  };
};

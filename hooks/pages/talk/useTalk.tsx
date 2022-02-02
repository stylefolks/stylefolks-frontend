import { ApolloError, useLazyQuery } from '@apollo/client';
import { GET_POST_BY_CATEGORY } from 'graphql/post/queries';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getPostByCategory,
  getPostByCategoryVariables,
  getPostByCategory_getPostByCategory_post,
} from 'src/__generated__/getPostByCategory';
import { FirstCategoryName } from 'src/__generated__/globalTypes';
interface IUseTalk {
  initialData: getPostByCategory;
}

const useTalk = ({ initialData }: IUseTalk) => {
  const router = useRouter();
  const [page, setPage] = useState<number>(2);
  const [data, setData] = useState<getPostByCategory_getPostByCategory_post[]>(
    initialData.getPostByCategory.post
  );

  const onCompleted = (data: getPostByCategory) => {
    if (data?.getPostByCategory?.ok) {
      setData((prev) => [...prev, ...moreData?.getPostByCategory.post]);
    }
  };

  const onError = (error: ApolloError) => {
    alert(error);
    router.push('/');
  };

  const [getTalkData, { data: moreData, loading, error }] = useLazyQuery<
    getPostByCategory,
    getPostByCategoryVariables
  >(GET_POST_BY_CATEGORY, { onError, onCompleted });

  const getMorePost = async (_page: number) => {
    getTalkData({
      variables: {
        input: {
          page: _page,
          inputTake: 9,
          firstCategoryName: FirstCategoryName.TALK,
        },
      },
    });
  };

  useEffect(() => {
    getMorePost(page);
  }, [page]);

  return {
    state: { data, page },
    actions: { setPage },
  };
};

export default useTalk;

import { useLazyQuery } from '@apollo/client';
import { GET_ALL_POSTS_QUERY } from 'graphql/post/queries';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getAllPosts,
  getAllPostsVariables,
  getAllPosts_getAllPosts_post,
} from 'src/__generated__/getAllPosts';

interface IUseMain {
  initialData: getAllPosts;
}

const useMain = ({ initialData }: IUseMain) => {
  const router = useRouter();
  const [page, setPage] = useState<number>(2);
  const [data, setData] = useState<getAllPosts_getAllPosts_post[]>(
    initialData.getAllPosts.post
  );

  const onCompleted = (data: getAllPosts) => {
    if (data.getAllPosts.ok) {
      setData((prev) => [...prev, ...moreData?.getAllPosts.post]);
    }
  };

  const onError = () => {
    console.log('메인 페이지 알 수 없는 에러 발생');
    router.push('/');
  };

  const [getAllPostsData, { data: moreData, loading, error, refetch }] =
    useLazyQuery<getAllPosts, getAllPostsVariables>(GET_ALL_POSTS_QUERY, {
      fetchPolicy: 'cache-first', // Used for first execution
      nextFetchPolicy: 'network-only', // Used for subsequent executions
      onError,
      onCompleted,
    });

  const getMorePost = async (_page: number) => {
    if (_page == 1) {
      return;
    }
    getAllPostsData({
      variables: {
        input: {
          page: _page,
          inputTake: 13,
        },
      },
    });
  };

  useEffect(() => {
    getMorePost(page);
  }, [page]);

  return {
    state: { data },
    actions: { setPage },
  };
};

export default useMain;

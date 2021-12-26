import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import {
  postStatusVar,
  userInfoVar,
  writtenPostVar,
} from 'cache/common/common.cache';
import { GET_EACH_POST_QUERY } from 'graphql/post/queries';
import { DELETE_POST } from 'graphql/upload/mutations';
import { useRouter } from 'next/router';
import {
  deleteMyPost,
  deleteMyPostVariables,
} from 'src/__generated__/deleteMyPost';
import {
  getEachPost,
  getEachPostVariables,
} from 'src/__generated__/getEachPost';
import { FirstCategoryName } from 'src/__generated__/globalTypes';

const useEachPost = () => {
  const router = useRouter();
  const postId = +router?.query.id;
  const user = useReactiveVar(userInfoVar);

  const { data, error, loading } = useQuery<getEachPost, getEachPostVariables>(
    GET_EACH_POST_QUERY,
    {
      nextFetchPolicy: 'network-only',
      fetchPolicy: 'network-only',
      variables: { postId },
    }
  );

  const onEdit = () => {
    const {
      firstCategory,
      secondCategory,
      title,
      contents,
      titleImg,
      crew,
      brand,
    } = data?.getEachPost.post;

    postStatusVar({
      ...postStatusVar(),
      isModify: true,
      modifyPostId: postId,
    });

    writtenPostVar({
      title,
      contents,
      titleImg,
      firstCategoryName: firstCategory.name as FirstCategoryName,
      secondCategoryName: secondCategory.name,
      crewId: crew ? crew.id : null,
      brandId: brand ? brand.id : null,
    });

    router.push('/upload');
  };

  const deleteMyPostOnCompleted = (data: deleteMyPost) => {
    if (data.deleteMyPost.ok) {
      router.push('/');
      return;
    }
    if (data.deleteMyPost.error) {
      alert(data.deleteMyPost.error);
      router.push('/');
    }
  };

  const [
    deletePostMutation,
    { loading: deleteMyPostLoading, error: deleteMyPostError },
  ] = useMutation<deleteMyPost, deleteMyPostVariables>(DELETE_POST, {
    onCompleted: deleteMyPostOnCompleted,
  });

  const onDelete = () => {
    deletePostMutation({
      variables: {
        postId,
      },
    });
  };

  return {
    state: {
      user,
      postId,
      data,
      loading,
      error,
      deleteMyPostLoading,
      deleteMyPostError,
    },
    actions: { onEdit, onDelete },
  };
};

export default useEachPost;

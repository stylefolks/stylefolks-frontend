import { ApolloError, useLazyQuery, useMutation } from '@apollo/client';
import { isLoggedInVar } from 'cache/common/common.cache';
import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  MODIFY_COMMENT,
} from 'graphql/mutations';
import { GET_EACH_POST_COMMENTS } from 'graphql/queries';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  createComment,
  createCommentVariables,
} from 'src/__generated__/createComment';
import {
  deleteComment,
  deleteCommentVariables,
} from 'src/__generated__/deleteComment';
import {
  getEachPostComments,
  getEachPostCommentsVariables,
} from 'src/__generated__/getEachPostComments';
import {
  modifyComment,
  modifyCommentVariables,
} from 'src/__generated__/modifyComment';

interface IuseCommentsProps {
  postId: number;
}
const useCommentBox = ({ postId }: IuseCommentsProps) => {
  const router = useRouter();
  const [comment, setComment] = useState<string>('');

  const onCompletedModify = (data: modifyComment) => {
    if (data.modifyComment.ok) {
      refetchGetEachPostComments({ postsId: postId });
    }
  };

  const onCompletedDelete = (data: deleteComment) => {
    if (data.deleteComment.ok) {
      refetchGetEachPostComments({ postsId: postId });
    }
  };

  const onCompletedCreateComment = (data: createComment) => {
    if (data.createComment.ok) {
      //나중에 리팩토링 시 여기에서 곧바로 캐시때리는것도 괜찮을듯..
      refetchGetEachPostComments({ postsId: postId });
      setComment('');
    }
  };

  const onErrorCreateComment = (error: ApolloError) => {
    alert(error.message);
    router.push('/'); //에러처리 추후 추가 필요
  };

  const onErrorGetComment = (error: ApolloError) => {
    alert(error.message);
    router.push('/'); //에러처리 추후 추가 필요
  };

  const [
    getEachPostComments,
    {
      data: commentsData,
      loading: commentsLoading,
      refetch: refetchGetEachPostComments,
    },
  ] = useLazyQuery<getEachPostComments, getEachPostCommentsVariables>(
    GET_EACH_POST_COMMENTS,
    {
      variables: {
        postsId: postId,
      },
      onError: onErrorGetComment,
    }
  );

  const [createComment, { loading: createCommentLoading }] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT, {
    onCompleted: onCompletedCreateComment,
    onError: onErrorCreateComment,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isLoggedInVar()) {
      return router.push('/login');
    }

    setComment(e.target.value);
  };

  //postId, comment
  const onClick = () => {
    if (!isLoggedInVar()) {
      return router.push('/login');
    }

    createComment({
      variables: {
        input: {
          postId,
          comment,
        },
      },
    });
  };

  const onErrorModify = (error: ApolloError) => {
    alert(error);
  };

  const [modifyComment, { data, error, loading }] = useMutation<
    modifyComment,
    modifyCommentVariables
  >(MODIFY_COMMENT, { onCompleted: onCompletedModify, onError: onErrorModify });

  const [deleteComment] = useMutation<deleteComment, deleteCommentVariables>(
    DELETE_COMMENT,
    {
      onCompleted: onCompletedDelete,
    }
  );

  const onSave = ({
    value,
    commentId,
  }: {
    value: string;
    commentId: number;
  }) => {
    modifyComment({
      variables: {
        input: {
          postId,
          comment: value,
          commentId,
        },
      },
    });
  };

  const onDelete = (commentId: number) => {
    deleteComment({
      variables: {
        input: {
          postId,
          commentId,
        },
      },
    });
  };

  return {
    actions: {
      onChange,
      onClick,
      onSave,
      onDelete,
      getEachPostComments,
      refetchGetEachPostComments,
    },
    state: {
      comment,
      commentsData,
      commentsLoading,
      createCommentLoading,
      router,
      loading,
    },
  };
};
export default useCommentBox;

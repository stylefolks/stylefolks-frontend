import { ApolloError, useLazyQuery, useMutation } from '@apollo/client';
import { isLoggedInVar } from 'cache/common/common.cache';
import { CREATE_COMMENT } from 'graphql/mutations';
import { GET_EACH_POST_COMMENTS } from 'graphql/queries';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  createComment,
  createCommentVariables,
} from 'src/__generated__/createComment';
import {
  getEachPostComments,
  getEachPostCommentsVariables,
} from 'src/__generated__/getEachPostComments';

interface IuseCommentsProps {
  postId: number;
}
const useComments = ({ postId }: IuseCommentsProps) => {
  const [comment, setComment] = useState<string>('');
  const router = useRouter();
  const onCompleted = (data: createComment) => {
    if (data.createComment.ok) {
      //나중에 리팩토링 시 여기에서 곧바로 캐시때리는것도 괜찮을듯..
      router.reload();
      setComment('');
    }
  };

  const onError = (err: ApolloError) => {
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
      onError,
    }
  );

  const [createComment, { loading: createCommentLoading }] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT, { onCompleted });

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

  return {
    actions: {
      onChange,
      onClick,
      getEachPostComments,
      refetchGetEachPostComments,
    },
    state: {
      comment,
      commentsData,
      commentsLoading,
      createCommentLoading,
    },
  };
};
export default useComments;

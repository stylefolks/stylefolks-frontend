import { useMutation, useQuery } from '@apollo/client';
import Comment from 'components/common/Comment';
import LoggedInUserProfileImage from 'components/user/LoggedInUserProfileImage';
import { CREATE_COMMENT } from 'graphql/mutations';
import { GET_EACH_POST_COMMENTS } from 'graphql/queries';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  createComment,
  createCommentVariables,
} from 'src/__generated__/createComment';
import {
  getEachPostComments,
  getEachPostCommentsVariables,
} from 'src/__generated__/getEachPostComments';
import CommentBoxStyle from 'styles/CommentBox.module.scss';
import { Button } from './Button';

interface ICommentBoxProps {
  postId: number;
}

const CommentBox: React.FC<ICommentBoxProps> = ({ postId }) => {
  const [comment, setComment] = useState<string>('');
  const router = useRouter();
  const onCompleted = (data: createComment) => {
    if (data.createComment.ok) {
      //나중에 리팩토링 시 여기에서 곧바로 캐시때리는것도 괜찮을듯..
      router.reload();
      setComment('');
    }
  };

  const {
    data: commentsData,
    error: commentsError,
    loading: commentsLoading,
  } = useQuery<getEachPostComments, getEachPostCommentsVariables>(
    GET_EACH_POST_COMMENTS,
    {
      variables: {
        postsId: postId,
      },
    }
  );

  const [createComment, { loading }] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT, { onCompleted });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  //postId, comment
  const onClick = () => {
    createComment({
      variables: {
        input: {
          postId,
          comment,
        },
      },
    });
  };

  if (commentsLoading) return <div>...Loading</div>;

  return (
    <section className={CommentBoxStyle.commentBoxContainer}>
      <div>
        <LoggedInUserProfileImage staticWidth={'40px'} staticHeight={'40px'} />
        <input value={comment} onChange={onChange} />
        <Button
          actionText={'등록'}
          onClick={onClick}
          canClick={!loading && comment.length >= 1}
          loading={loading}
        />
      </div>
      <ul className={CommentBoxStyle.commentsWrapper}>
        {commentsData?.getEachPostComments?.comments?.map((el, index) => (
          <Comment
            comment={el.comment}
            commentUser={el.user}
            key={index}
            postId={postId}
            commentId={el.id}
          />
        ))}
      </ul>
      <style jsx>{``}</style>
    </section>
  );
};

export default CommentBox;

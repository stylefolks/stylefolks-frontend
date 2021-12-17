import { Button } from 'components/common/button/Button';
import Comments from 'components/common/comments/Comments';
import LoggedInUserProfileImage from 'components/user/LoggedInUserProfileImage';
import React, { useEffect } from 'react';
import CommentBoxStyle from 'styles/CommentBox.module.scss';
import useComments from './useComments';

interface ICommentBoxProps {
  postId: number;
}

const CommentBox: React.FC<ICommentBoxProps> = ({ postId }) => {
  const { state, actions } = useComments({ postId });
  const { comment, commentsLoading, createCommentLoading, commentsData } =
    state;
  const { onChange, onClick, getEachPostComments } = actions;

  useEffect(() => {
    getEachPostComments();
  }, []);

  if (commentsLoading) return <div>...Loading</div>;

  return (
    <section className={CommentBoxStyle.commentBoxContainer}>
      <div>
        <LoggedInUserProfileImage staticWidth={'40px'} staticHeight={'40px'} />
        <input value={comment} onChange={onChange} />
        <Button
          actionText={'등록'}
          onClick={onClick}
          canClick={!createCommentLoading && comment.length >= 1}
          loading={createCommentLoading}
        />
      </div>
      <ul className={CommentBoxStyle.commentsWrapper}>
        {commentsData?.getEachPostComments?.comments?.map((el, index) => (
          <Comments
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

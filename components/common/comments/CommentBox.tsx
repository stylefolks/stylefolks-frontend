import Comments from 'components/common/comments/Comments';
import LoggedInUserProfileImage from 'components/user/LoggedInUserProfileImage';
import React, { useEffect } from 'react';
import CommentBoxStyle from 'styles/CommentBox.module.scss';
import { ModifyButton } from '../button/ModifyButton';
import useCommentBox from './useCommentBox';

interface ICommentBoxProps {
  postId: number;
}

const CommentBox: React.FC<ICommentBoxProps> = ({ postId }) => {
  const { state, actions } = useCommentBox({ postId });
  const {
    comment,
    commentsLoading,
    createCommentLoading,
    commentsData,
    loading,
  } = state;
  const { onChange, onClick, getEachPostComments, onSave, onDelete } = actions;

  useEffect(() => {
    getEachPostComments();
  }, []);

  if (commentsLoading) return <div>...Loading</div>;

  return (
    <section className={CommentBoxStyle.commentBoxContainer}>
      <div>
        <LoggedInUserProfileImage staticWidth={'40px'} staticHeight={'40px'} />
        <input value={comment} onChange={onChange} />
        <ModifyButton
          onClick={onClick}
          canClick={!createCommentLoading && comment.length >= 1}
        />
      </div>
      <ul className={CommentBoxStyle.commentsWrapper}>
        {commentsData?.getEachPostComments?.comments?.map((el, index) => (
          <Comments
            loading={loading}
            onDelete={onDelete}
            onSave={onSave}
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
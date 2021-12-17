import { userInfoVar } from 'cache/common/common.cache';
import LoggedInUserProfileImage from 'components/user/LoggedInUserProfileImage';
import React, { useEffect } from 'react';
import { getEachPostComments_getEachPostComments_comments_user } from 'src/__generated__/getEachPostComments';
import CommentBoxStyle from 'styles/CommentBox.module.scss';
import { Button } from '../button/Button';
import useComments from './useComments';

interface IPropsComment {
  comment: string;
  commentUser: getEachPostComments_getEachPostComments_comments_user;
  postId: number;
  commentId: number;
  loading: boolean;
  onSave: ({ value, commentId }: { value: string; commentId: number }) => void;
  onDelete: (commentId: number) => void;
}

const Comments: React.FC<IPropsComment> = ({
  comment,
  commentUser,
  postId,
  commentId,
  loading,
  onSave,
  onDelete,
}) => {
  const { state, actions } = useComments({ postId, commentId });
  const { edit, value } = state;
  const { setValue, setEdit, onEdit, onChange } = actions;

  useEffect(() => {
    if (edit) setValue(comment);
  }, [edit]);

  useEffect(() => {
    if (!loading) {
      setEdit(false);
    }
  }, [loading]);

  return (
    <li className={CommentBoxStyle.comment}>
      <div className={CommentBoxStyle.profileWrapper}>
        <LoggedInUserProfileImage />
        <span>{commentUser.nickname}</span>
      </div>
      {!edit ? (
        <>
          <span>{comment}</span>
        </>
      ) : (
        <textarea onChange={onChange} value={value}></textarea>
      )}

      {commentUser.id === userInfoVar().id ? (
        <div className={CommentBoxStyle.buttonSpace}>
          {edit ? (
            <Button
              onClick={() => onSave({ value, commentId })}
              actionText="수정완료"
              loading={false}
              canClick={true}
            />
          ) : (
            <Button
              onClick={onEdit}
              actionText="수정"
              loading={false}
              canClick={true}
            />
          )}
          {edit ? (
            <Button
              onClick={onEdit}
              actionText="수정 취소"
              loading={false}
              canClick={true}
            />
          ) : (
            <Button
              onClick={() => onDelete(commentId)}
              actionText="삭제"
              loading={false}
              canClick={true}
            />
          )}
        </div>
      ) : (
        <div className={CommentBoxStyle.buttonSpace}></div>
      )}
    </li>
  );
};

export default Comments;

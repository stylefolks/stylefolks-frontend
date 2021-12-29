import { useReactiveVar } from '@apollo/client';
import { userInfoVar } from 'cache/common/common.cache';
import LoggedInUserProfileImage from 'components/user/LoggedInUserProfileImage';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { getEachPostComments_getEachPostComments_comments_user } from 'src/__generated__/getEachPostComments';
import CommentBoxStyle from 'styles/post/CommentBox.module.scss';
import { CancelButton } from '../button/CancelButton';
import { CompleteButton } from '../button/CompleteButton';
import { DeleteButton } from '../button/DeleteButton';
import { ModifyButton } from '../button/ModifyButton';
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
  const userInfo = useReactiveVar(userInfoVar);
  const { state, actions } = useComments();
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
        <Link href={`/user/${commentUser.nickname}`}>
          <a>
            <LoggedInUserProfileImage />
            <span>{commentUser.nickname}</span>
          </a>
        </Link>
      </div>
      {!edit ? (
        <>
          <span>{comment}</span>
        </>
      ) : (
        <textarea onChange={onChange} value={value}></textarea>
      )}

      {commentUser.id === userInfo.id ? (
        <div className={CommentBoxStyle.buttonSpace}>
          {edit ? (
            <CompleteButton
              canClick={true}
              onClick={() => onSave({ value, commentId })}
            />
          ) : (
            <ModifyButton onClick={onEdit} canClick={true} />
          )}
          {edit ? (
            <CancelButton onClick={onEdit} canClick={true} />
          ) : (
            <DeleteButton onClick={() => onDelete(commentId)} canClick={true} />
          )}
        </div>
      ) : (
        <div className={CommentBoxStyle.buttonSpace}></div>
      )}
    </li>
  );
};

export default Comments;

import { useMutation } from '@apollo/client';
import LoggedInUserProfileImage from 'components/user/LoggedInUserProfileImage';
import { DELETE_COMMENT, MODIFY_COMMENT } from 'graphql/mutations';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  deleteComment,
  deleteCommentVariables,
} from 'src/__generated__/deleteComment';
import { getEachPostComments_getEachPostComments_comments_user } from 'src/__generated__/getEachPostComments';
import {
  modifyComment,
  modifyCommentVariables,
} from 'src/__generated__/modifyComment';
import { RootState } from 'store/modules';
import CommentBoxStyle from 'styles/CommentBox.module.scss';
import { Button } from './button/Button';

interface IPropsComment {
  comment: string;
  commentUser: getEachPostComments_getEachPostComments_comments_user;
  postId: number;
  commentId: number;
}

const Comment: React.FC<IPropsComment> = ({
  comment,
  commentUser,
  postId,
  commentId,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const { user: loginUser } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const onCompletedModify = (data: modifyComment) => {
    if (data.modifyComment.ok) {
      router.reload();
    }
  };

  const onCompletedDelete = (data: deleteComment) => {
    if (data.deleteComment.ok) {
      router.reload();
    }
  };

  const [modifyComment, { data, error, loading }] = useMutation<
    modifyComment,
    modifyCommentVariables
  >(MODIFY_COMMENT, { onCompleted: onCompletedModify });

  const [deleteComment] = useMutation<deleteComment, deleteCommentVariables>(
    DELETE_COMMENT,
    {
      onCompleted: onCompletedDelete,
    }
  );

  const onEdit = () => {
    setEdit((prev) => !prev);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const onSave = () => {
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

  const onDelete = () => {
    deleteComment({
      variables: {
        input: {
          postId,
          commentId,
        },
      },
    });
  };

  useEffect(() => {
    if (edit) setValue(comment);
  }, [edit]);

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

      {commentUser.id === +loginUser.id ? (
        <div className={CommentBoxStyle.buttonSpace}>
          {edit ? (
            <Button
              onClick={onSave}
              actionText="수정완료"
              loading={loading}
              canClick={!loading}
            />
          ) : (
            <Button
              onClick={onEdit}
              actionText="수정"
              loading={loading}
              canClick={!loading}
            />
          )}
          {edit ? (
            <Button
              onClick={onEdit}
              actionText="수정 취소"
              loading={loading}
              canClick={!loading}
            />
          ) : (
            <Button
              onClick={onDelete}
              actionText="삭제"
              loading={loading}
              canClick={!loading}
            />
          )}
        </div>
      ) : (
        <div className={CommentBoxStyle.buttonSpace}></div>
      )}
    </li>
  );
};

export default Comment;

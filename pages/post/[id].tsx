import Alert from 'components/common/Alert';
import { DeleteButton } from 'components/common/button/DeleteButton';
import { ModifyButton } from 'components/common/button/ModifyButton';
import CommentBox from 'components/common/comments/CommentBox';
import useEachPost from 'hooks/pages/post/useEachPost';
import Link from 'next/link';
import PostStyle from 'styles/post/Post.module.scss';
import EditorViewer from '../../components/upload/EditorViewer';
import CategoryStyle from 'styles/post/Category.module.scss';

export const Post = () => {
  const { state, actions } = useEachPost();
  const {
    user,
    postId,
    data,
    loading,
    error,
    deleteMyPostLoading,
    deleteMyPostError,
  } = state;
  const { onEdit, onDelete } = actions;

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <title>The Folks | Post</title>
      <div className={PostStyle.wrapper}>
        <div className={PostStyle.divider} />
        <section className={CategoryStyle.categoryContainer}>
          <div>
            <span>Written Story named as {data?.getEachPost.post.title} </span>
            <span> in {data?.getEachPost.post.secondCategory.name}</span>
            <span> at {data?.getEachPost.post.firstCategory.name}</span>
            <Link href={`/user/${data?.getEachPost.post.user.nickname}`}>
              <a> By {data?.getEachPost.post.user.nickname} </a>
            </Link>
          </div>
          <div className={CategoryStyle.categoryButtonWrapper}>
            {user.id === data.getEachPost.post.user.id && (
              <div>
                <ModifyButton onClick={onEdit} canClick={true} />
                <DeleteButton
                  onClick={onDelete}
                  canClick={!deleteMyPostLoading && !deleteMyPostError}
                />
              </div>
            )}
            <span>조회수: {data.getEachPost.post.viewCount}</span>
          </div>
        </section>
        <div className={PostStyle.divider} />
        <EditorViewer content={data?.getEachPost.post.contents} />
        <div className={PostStyle.divider} />
        <CommentBox postId={postId} />
        <Alert onConfirm={onDelete} />
      </div>
    </>
  );
};

export default Post;

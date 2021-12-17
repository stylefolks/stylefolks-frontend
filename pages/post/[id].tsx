import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import {
  postStatusVar,
  userInfoVar,
  writtenPostVar,
} from 'cache/common/common.cache';
import { DeleteButton } from 'components/common/button/DeleteButton';
import { ModifyButton } from 'components/common/button/ModifyButton';
import CommentBox from 'components/common/comments/CommentBox';
import { DELETE_POST } from 'graphql/mutations';
import { GET_EACH_POST_QUERY } from 'graphql/queries';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  deleteMyPost,
  deleteMyPostVariables,
} from 'src/__generated__/deleteMyPost';
import { FirstCategoryName } from 'src/__generated__/globalTypes';
import PostStyle from 'styles/Post.module.scss';
import EditorViewer from '../../components/upload/EditorViewer';
import {
  getEachPost,
  getEachPostVariables,
} from '../../src/__generated__/getEachPost';
import CategoryStyle from '../../styles/Category.module.scss';

export const Post = () => {
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
      router.push('/');
      alert(data.deleteMyPost.error);
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

  if (loading) return <div>Loading...</div>;

  return (
    <>
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
      </div>
    </>
  );
};

export default Post;

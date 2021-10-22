import { useMutation, useQuery } from '@apollo/client';
import { Button } from 'components/common/Button';
import CommentBox from 'components/common/CommentBox';
import { DELETE_POST } from 'graphql/mutations';
import { GET_EACH_POST_QUERY } from 'graphql/queries';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteMyPost,
  deleteMyPostVariables,
} from 'src/__generated__/deleteMyPost';
import { RootState } from 'store/modules';
import {
  setIsModify,
  setModifyPostId,
  setTitleImageArr,
  upadatePost,
} from 'store/modules/uploadReducer';
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
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { data, error, loading } = useQuery<getEachPost, getEachPostVariables>(
    GET_EACH_POST_QUERY,
    {
      nextFetchPolicy: 'network-only',
      fetchPolicy: 'network-only',
      variables: { postId },
    }
  );

  const onEdit = () => {
    const { firstCategory, secondCategory, title, contents, titleImg } =
      data?.getEachPost.post;

    dispatch(
      upadatePost({
        title,
        contents,
        titleImg,
        firstCategoryId: firstCategory.id,
        firstCategoryName: firstCategory.name,
        secondCategoryId: secondCategory.id,
        secondCategoryName: secondCategory.name,
      })
    );
    dispatch(
      setTitleImageArr(data.getEachPost.post.image.map((el) => el.link))
    );
    router.push('/upload');
    dispatch(setIsModify(true));
    dispatch(setModifyPostId(postId));
  };

  const deleteMyPostOnCompleted = (data: deleteMyPost) => {
    if (data.deleteMyPost.ok) {
      router.push('/');
      return;
    }
    if (data.deleteMyPost.error) {
      console.log(data?.deleteMyPost.error);
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
          <div>
            {+user.id === +data.getEachPost.post.user.id && (
              <>
                <Button
                  onClick={onEdit}
                  actionText="수정"
                  loading={false}
                  canClick={true}
                />
                <Button
                  onClick={onDelete}
                  actionText="삭제"
                  loading={deleteMyPostLoading}
                  canClick={!deleteMyPostLoading && !deleteMyPostError}
                />
              </>
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

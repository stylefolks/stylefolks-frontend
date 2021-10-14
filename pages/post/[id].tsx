import { useQuery } from '@apollo/client';
import { Button } from 'components/common/Button';
import CommentBox from 'components/common/CommentBox';
import { GET_EACH_POST_QUERY } from 'graphql/queries';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
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
    console.log('..???', data?.getEachPost?.post?.secondCategory.id);

    dispatch(
      upadatePost({
        title: data?.getEachPost?.post?.title,
        contents: data?.getEachPost?.post?.contents,
        titleImg: data?.getEachPost?.post?.titleImg,
        firstCategoryId: data?.getEachPost?.post?.firstCategory.id,
        firstCategoryName: data?.getEachPost?.post?.firstCategory.name,
        secondCategoryId: data?.getEachPost?.post?.secondCategory.id,
        secondCategoryName: data?.getEachPost?.post?.secondCategory.name,
      })
    );
    dispatch(
      setTitleImageArr(data.getEachPost.post.image.map((el) => el.link))
    );
    router.push('/upload');
    dispatch(setIsModify(true));
    dispatch(setModifyPostId(postId));
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
          {+user.id === +data.getEachPost.post.user.id && (
            <>
              <Button
                onClick={onEdit}
                actionText="수정"
                loading={false}
                canClick={true}
              />
              <Button
                onClick={() => console.log('삭제')}
                actionText="삭제"
                loading={false}
                canClick={true}
              />
            </>
          )}
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

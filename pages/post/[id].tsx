import { useQuery } from '@apollo/client';
import { Button } from 'components/common/Button';
import CommentBox from 'components/common/CommentBox';
import { GET_EACH_POST_QUERY } from 'graphql/queries';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from 'store/modules';
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
  const { user } = useSelector((state: RootState) => state.user);
  const { data, error, loading } = useQuery<getEachPost, getEachPostVariables>(
    GET_EACH_POST_QUERY,
    {
      nextFetchPolicy: 'network-only',
      variables: { postId },
    }
  );

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
                onClick={() => console.log('수정')}
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

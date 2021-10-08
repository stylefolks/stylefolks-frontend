import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import EditorViewer from '../../components/EditorViewer';
import {
  getEachPost,
  getEachPostVariables,
} from '../../src/__generated__/getEachPost';
import CategoryStyle from '../../styles/Category.module.scss';
const GET_EACH_POST_QUERY = gql`
  query getEachPost($postId: Int!) {
    getEachPost(postId: $postId) {
      ok
      error
      post {
        title
        titleImg
        contents
        firstCategory {
          name
          id
        }
        secondCategory {
          name
          id
        }
        user {
          nickname
          id
        }
      }
    }
  }
`;

export const Post = () => {
  const router = useRouter();
  const postId = +router?.query.id;

  // useEffect(() => {
  //   if (!postId) {
  //     router.push('/');
  //   }
  // }, []);

  const { data, error, loading } = useQuery<getEachPost, getEachPostVariables>(
    GET_EACH_POST_QUERY,
    {
      variables: { postId },
    }
  );

  if (loading) return <div>Loading...</div>;
  // if (!loading) {
  //   if (!data?.getEachPost.post || !data?.getEachPost.post.contents || error) {
  //     return <div>Ther is No Story AnyMore..</div>;
  //   }
  // }

  return (
    <>
      <div className="wrapper">
        <div className="divider" />
        <section className={CategoryStyle.categoryContainer}>
          <div>
            <span>Written Story named as {data?.getEachPost.post.title} </span>
            <span> in {data?.getEachPost.post.secondCategory.name}</span>
            <span> at {data?.getEachPost.post.firstCategory.name}</span>
            <span> By {data?.getEachPost.post.user.nickname}</span>
          </div>
        </section>
        <div className="divider" />
        <EditorViewer content={data?.getEachPost.post.contents} />
        <div className="divider" />
        <section>
          댓글 들어가야함
          <ul>
            <li>댓글 1</li>
            <li>댓글 1</li>
            <li>댓글 1</li>
            <li>댓글 1</li>
            <li>댓글 1</li>
            <li>댓글 1</li>
          </ul>
        </section>
        <style jsx>{`
          .divider {
            border-bottom: 1px solid #efeff0;
            width: 100%;
            margin: 4vh 0;
          }

          .wrapper {
            margin: 8vh 0;
          }
        `}</style>
      </div>
    </>
  );
};

export default Post;

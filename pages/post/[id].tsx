import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import EditorViewer from '../../components/EditorViewer';
import {
  getEachPost,
  getEachPostVariables,
} from '../../src/__generated__/getEachPost';
const GET_EACH_POST_QUERY = gql`
  query getEachPost($postId: Int!) {
    getEachPost(postId: $postId) {
      ok
      error
      post {
        title
        titleImg
        contents
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

  const { data, error, loading } = useQuery<getEachPost, getEachPostVariables>(
    GET_EACH_POST_QUERY,
    {
      variables: { postId },
    }
  );
  if (loading) return <div>조금만 기다려주세요~~</div>;
  return <EditorViewer content={data?.getEachPost.post.contents} />;
};

// export const getServerSideProps = ({ params }) => {
//   console.log(params);
// };

export default Post;

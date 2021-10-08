import { gql, useMutation, useQuery } from '@apollo/client';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../components/Button';
import CategorySelector from '../components/CategorySelector';
import WysiwygEditor from '../components/Editor';
import TitleImagePicker from '../components/TitleImagePicker';
import { ME_QUERY } from '../graphql/queries';
import {
  createPost,
  createPostVariables,
} from '../src/__generated__/createPost';
import { RootState } from '../store/modules';
import { upadatePost } from '../store/modules/uploadReducer';

const CREATE_POST_MUTATION = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
      ok
      error
    }
  }
`;

const Upload = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useQuery(ME_QUERY);
  const { post, titleImageArr } = useSelector(
    (state: RootState) => state.upload
  );
  const router = useRouter();

  const createPostonCompleted = (data: createPost) => {
    if (data?.createPost.ok) {
      router.push('/'); //나중에는 작성된 글로 돌아가게 만들어 주자
    }

    if (data?.createPost.error) {
      alert(
        `${data.createPost.error}. \n문제가 지속되면 관리자에게 문의해주세요 :)`
      );
    }
  };

  const [
    createPostMutation,
    { loading: createPostLoading, error: createPostError },
  ] = useMutation<createPost, createPostVariables>(CREATE_POST_MUTATION, {
    onCompleted: createPostonCompleted,
  });

  const onClick = () => {
    const { title, contents, titleImg, firstCategoryId, secondCategoryId } =
      post;
    createPostMutation({
      variables: {
        input: {
          title,
          contents,
          titleImg,
          firstCategoryId,
          secondCategoryId,
        },
      },
    });
  };
  if (createPostLoading)
    return <div>업로드중입니다 잠시만 기다려주세요... :)</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="wrapper">
      <CategorySelector role={data?.me.role} />
      <WysiwygEditor
        height={'90vh'}
        onChange={(contents) => dispatch(upadatePost({ ...post, contents }))}
      />
      <div>
        <TitleImagePicker />
      </div>
      {/* <button onClick={onClick}>upload!</button> */}
      <Button
        canClick={false}
        actionText="Upload!"
        loading={false}
        onClick={onClick}
      />
      <style jsx>{`
        .wrapper {
          max-width: 860px;
          width: 95%;
          margin: 2vh 0;
        }

        @media screen and (max-width: 110px) {
          .toastui-editor-popup {
            position: absolute;
            right: 0px !important;
            top: auto !important;
            left: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Upload;

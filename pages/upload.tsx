import { gql, useMutation, useQuery } from '@apollo/client';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../components/Button';
import CategorySelector from '../components/CategorySelector';
import WysiwygEditor from '../components/Editor';
import TempPostBox from '../components/TempPostBox';
import TitleImagePicker from '../components/TitleImagePicker';
import { ME_QUERY } from '../graphql/queries';
import {
  createPost,
  createPostVariables,
} from '../src/__generated__/createPost';
import {
  createTemp,
  createTempVariables,
} from '../src/__generated__/createTemp';
import {
  modifyTemp,
  modifyTempVariables,
} from '../src/__generated__/modifyTemp';
import { RootState } from '../store/modules';
import {
  initializeUploadState,
  upadatePost,
} from '../store/modules/uploadReducer';

const CREATE_POST_MUTATION = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
      ok
      error
    }
  }
`;

const CREATE_TEMP_MUTATION = gql`
  mutation createTemp($input: CreateTempInput!) {
    createTemp(input: $input) {
      ok
      error
    }
  }
`;

const MODIFY_TEMP_MUTATION = gql`
  mutation modifyTemp($input: ModifyMyTemptInput!) {
    modifyTemp(input: $input) {
      ok
      error
    }
  }
`;

const Upload = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useQuery(ME_QUERY);

  const { post, titleImageArr, isTemp, pickTempId } = useSelector(
    (state: RootState) => state.upload
  );

  const router = useRouter();

  const createPostonCompleted = (data: createPost) => {
    if (data?.createPost.ok) {
      dispatch(initializeUploadState()); //다 저장되고나서 초기 state로 돌아가야하는데 ..
      alert('저장완료!');
      router.push('/'); //나중에는 작성된 글로 돌아가게 만들어 주자
    }

    if (data?.createPost.error) {
      alert(
        `${data.createPost.error}. \n문제가 지속되면 관리자에게 문의해주세요 :)`
      );
    }
  };

  const createTemponCompleted = (data: createTemp) => {
    if (data?.createTemp.ok) {
      dispatch(initializeUploadState()); //다 저장되고나서 초기 state로 돌아가야하는데 ..
      alert('저장완료!');
      router.push('/'); //나중에는 작성된 글로 돌아가게 만들어 주자
    }

    if (data?.createTemp.error) {
      alert(
        `${data.createTemp.error}. \n문제가 지속되면 관리자에게 문의해주세요 :)`
      );
    }
  };

  const ModifyTempOnCompleted = (data: modifyTemp) => {
    if (data?.modifyTemp.ok) {
      dispatch(initializeUploadState()); //다 저장되고나서 초기 state로 돌아가야하는데 ..
      alert('저장완료!');
      router.push('/'); //나중에는 작성된 글로 돌아가게 만들어 주자
    }

    if (data?.modifyTemp.error) {
      alert(
        `${data.modifyTemp.error}. \n문제가 지속되면 관리자에게 문의해주세요 :)`
      );
    }
  };

  const [
    createPostMutation,
    { loading: createPostLoading, error: createPostError },
  ] = useMutation<createPost, createPostVariables>(CREATE_POST_MUTATION, {
    onCompleted: createPostonCompleted,
  });

  const [
    modifyTempMutation,
    { loading: ModifyTempLoading, error: modifyTempError },
  ] = useMutation<modifyTemp, modifyTempVariables>(MODIFY_TEMP_MUTATION, {
    onCompleted: ModifyTempOnCompleted,
  });

  const [
    createTempMutation,
    { loading: createTempLoading, error: createTempError },
  ] = useMutation<createTemp, createTempVariables>(CREATE_TEMP_MUTATION, {
    onCompleted: createTemponCompleted,
  });

  const handleTempSave = () => {
    const { title, contents, titleImg, firstCategoryId, secondCategoryId } =
      post;
    createTempMutation({
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

  const handleTempModify = () => {
    const { title, contents, titleImg, firstCategoryId, secondCategoryId } =
      post;
    modifyTempMutation({
      variables: {
        input: {
          postId: pickTempId,
          title,
          contents,
          titleImg,
          firstCategoryId,
          secondCategoryId,
        },
      },
    });
  };

  const handleUpload = () => {
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

  useEffect(() => {
    return () => {
      dispatch(initializeUploadState());
    };
  }, []);

  if (createPostLoading || createTempLoading)
    return <div>업로드중입니다 잠시만 기다려주세요... :)</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="wrapper">
      <CategorySelector role={data?.me.role} />
      {isTemp ? (
        <>
          <span>임시저장 글 불러오기</span>
          <WysiwygEditor
            initialValue={post.contents}
            height={'90vh'}
            onChange={(contents) =>
              dispatch(upadatePost({ ...post, contents }))
            }
          />
        </>
      ) : (
        <WysiwygEditor
          initialValue={'yohoho'}
          height={'90vh'}
          onChange={(contents) => dispatch(upadatePost({ ...post, contents }))}
        />
      )}

      <TitleImagePicker />
      <TempPostBox userId={data?.me.id} />

      <div className="buttonWrapper">
        <Button
          canClick={false}
          actionText={isTemp ? '임시 저장 글 수정 완료' : '게시글 임시저장'}
          loading={false}
          onClick={isTemp ? handleTempModify : handleTempSave}
        />
        <Button
          canClick={false}
          actionText="Upload!"
          loading={false}
          onClick={handleUpload}
        />
      </div>
      <style jsx>{`
        .buttonWrapper {
          display: flex;
          justify-content: space-between;
        }

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

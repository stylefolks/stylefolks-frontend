import { gql, useMutation, useQuery } from '@apollo/client';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Button } from 'components/common/Button';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadTemp, uploadTempVariables } from 'src/__generated__/uploadTemp';
import { setAlert } from 'store/modules/commonReducer';
import CategorySelector from '../components/upload/CategorySelector';
import WysiwygEditor from '../components/upload/Editor';
import TempPostBox from '../components/upload/TempPostBox';
import TitleImagePicker from '../components/upload/TitleImagePicker';
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

const UPLOAD_TEMP_MUTATION = gql`
  mutation uploadTemp($input: UploadTempInput!) {
    uploadTemp(input: $input) {
      ok
      error
    }
  }
`;

const Upload = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useQuery(ME_QUERY);
  const { post, pickTempId } = useSelector((state: RootState) => state.upload);
  const { title, contents, titleImg, firstCategoryId, secondCategoryId } = post;
  const createPostonCompleted = (data: createPost) => {
    if (data?.createPost.ok) {
      dispatch(
        setAlert({
          title: '새로운 게시물',
          content: '새로운 게시물 업로드를 완료하였습니다. ^_^',
        })
      );
    }

    if (data?.createPost.error) {
      alert(
        `${data.createPost.error}. \n문제가 지속되면 관리자에게 문의해주세요 :)`
      );
    }
  };

  const createTemponCompleted = (data: createTemp) => {
    if (data?.createTemp.ok) {
      dispatch(
        setAlert({
          title: '임시 게시물',
          content: '새로운 임시저장 게시물 저장을 완료하였습니다. :)',
        })
      );
    }

    if (data?.createTemp.error) {
      alert(
        `${data.createTemp.error}. \n문제가 지속되면 관리자에게 문의해주세요 :)`
      );
    }
  };

  const ModifyTempOnCompleted = (data: modifyTemp) => {
    if (data?.modifyTemp.ok) {
      dispatch(
        setAlert({
          title: '임시 게시물',
          content: '임시저장 게시물 저장이 완료되었습니다. :)',
        })
      );
    }

    if (data?.modifyTemp.error) {
      alert(
        `${data.modifyTemp.error}. \n문제가 지속되면 관리자에게 문의해주세요 :)`
      );
    }
  };

  const uploadMutationOnCompleted = (data: uploadTemp) => {
    if (data?.uploadTemp.ok) {
      dispatch(
        setAlert({
          title: '임시 게시물',
          content: '임시저장 게시물의 업로드가 완료되었습니다. :)',
        })
      );
    }
    if (data?.uploadTemp.error) {
      alert(
        `${data.uploadTemp.error}. \n문제가 지속되면 관리자에게 문의해주세요 :)`
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

  const [
    uploadTempMutation,
    { loading: uploadTempLoading, error: uploadTempError },
  ] = useMutation<uploadTemp, uploadTempVariables>(UPLOAD_TEMP_MUTATION, {
    onCompleted: uploadMutationOnCompleted,
  });

  const handleTempSave = () => {
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

  const handleTempUpload = () => {
    uploadTempMutation({
      variables: {
        input: {
          title,
          contents,
          titleImg,
          firstCategoryId,
          secondCategoryId,
          tempId: pickTempId,
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
    <>
      <div className="wrapper">
        <CategorySelector role={data?.me.role} />

        <WysiwygEditor
          autofocus={false}
          initialValue={''}
          height={'90vh'}
          onChange={(contents) => dispatch(upadatePost({ ...post, contents }))}
        />

        <TitleImagePicker />
        <div className="buttonWrapper">
          <Button
            canClick={false}
            actionText={
              pickTempId ? 'Modifications completed' : 'Temporarily Save'
            }
            loading={false}
            onClick={pickTempId ? handleTempModify : handleTempSave}
          />
          <Button
            canClick={false}
            actionText={
              pickTempId ? 'Upload temp post to new post' : 'Upload new post'
            }
            loading={false}
            onClick={pickTempId ? handleTempUpload : handleUpload}
          />
        </div>

        <TempPostBox userId={data?.me.id} />
      </div>

      <style jsx>{`
        .buttonWrapper {
          display: flex;
          justify-content: space-between;
        }

        .container {
          display: flex;
        }

        .wrapper {
          max-width: 860px;
          width: 95%;
          margin: 2vh 0;
          position: relative;
        }

        @media screen and (max-width: 110px) {
          .toastui-editor-popup {
            position: absolute;
            right: 0px !important;
            top: auto !important;
            left: auto !important;
          }
          .tempBoxWrapper {
            top: 0px;
            left: 0px;
            bottom: -250px;
          }
        }
      `}</style>
    </>
  );
};

export default Upload;

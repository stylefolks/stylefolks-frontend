import { useMutation } from '@apollo/client';
import '@toast-ui/editor/dist/toastui-editor.css';
import { alertVar, userInfoVar } from 'cache/common/common.cache';
import { Button } from 'components/common/Button';
import {
  CREATE_POST_MUTATION,
  CREATE_TEMP_MUTATION,
  MODIFY_POST,
  MODIFY_TEMP_MUTATION,
  UPLOAD_TEMP_MUTATION,
} from 'graphql/mutations';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modifyPost, modifyPostVariables } from 'src/__generated__/modifyPost';
import { uploadTemp, uploadTempVariables } from 'src/__generated__/uploadTemp';
import CategorySelector from '../components/upload/CategorySelector';
import WysiwygEditor from '../components/upload/Editor';
import TempPostBox from '../components/upload/TempPostBox';
import TitleImagePicker from '../components/upload/TitleImagePicker';
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

const Upload = () => {
  const dispatch = useDispatch();

  const user = userInfoVar();
  const router = useRouter();
  const { post, pickTempId, isModify, modifyPostId } = useSelector(
    (state: RootState) => state.upload
  );
  const { title, contents, titleImg, firstCategoryId, secondCategoryId } = post;

  const createPostonCompleted = (data: createPost) => {
    if (data?.createPost.ok) {
      alertVar({
        title: '새로운 게시물',
        content: '새로운 게시물 업로드를 완료하였습니다. ^_^',
        visible: true,
      });
    }

    if (data?.createPost.error) {
      console.log(
        `${data.createPost.error}. \n문제가 지속되면 관리자에게 문의해주세요!`
      );
    }
  };

  const createTemponCompleted = (data: createTemp) => {
    if (data?.createTemp.ok) {
      alertVar({
        title: '임시 게시물',
        content: '새로운 임시저장 게시물 저장을 완료하였습니다. :)',
        visible: true,
      });
    }

    if (data?.createTemp.error) {
      console.log(
        `${data.createTemp.error}. \n문제가 지속되면 관리자에게 문의해주세요 :)`
      );
    }
  };

  const ModifyTempOnCompleted = (data: modifyTemp) => {
    if (data?.modifyTemp.ok) {
      alertVar({
        title: '임시 게시물',
        content: '임시저장 게시물 저장이 완료되었습니다. :)',
        visible: true,
      });
    }

    if (data?.modifyTemp.error) {
      console.log(
        `${data.modifyTemp.error}. \n문제가 지속되면 관리자에게 문의해주세요 :)`
      );
    }
  };

  const uploadMutationOnCompleted = (data: uploadTemp) => {
    if (data?.uploadTemp.ok) {
      alertVar({
        title: '임시 게시물',
        content: '임시저장 게시물의 업로드가 완료되었습니다. :)',
        visible: true,
      });
    }
    if (data?.uploadTemp.error) {
      console.log(
        `${data.uploadTemp.error}. \n문제가 지속되면 관리자에게 문의해주세요 :)`
      );
    }
  };
  const modifyPostOnCompleted = (data: modifyPost) => {
    if (data.modifyPost.ok) {
      router.push(`/post/${modifyPostId}`);
    }
  };

  const [
    modifyPostMutation,
    { loading: modifyPostLoading, error: modifyPostError },
  ] = useMutation<modifyPost, modifyPostVariables>(MODIFY_POST, {
    onCompleted: modifyPostOnCompleted,
  });

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

  const handleModifyDone = () => {
    modifyPostMutation({
      variables: {
        input: {
          title,
          contents,
          titleImg,
          firstCategoryId,
          secondCategoryId,
          postId: modifyPostId,
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

  return (
    <>
      <div className="wrapper">
        <CategorySelector role={user?.role} />

        <WysiwygEditor
          autofocus={false}
          initialValue={''}
          height={'90vh'}
          onChange={(contents) => dispatch(upadatePost({ ...post, contents }))}
        />

        <TitleImagePicker />
        <div className="buttonWrapper">
          {modifyPostId ? (
            <Button
              canClick={!modifyPostError && !modifyPostLoading}
              loading={modifyPostLoading}
              actionText="게시글 수정 완료"
              onClick={handleModifyDone}
            />
          ) : (
            <>
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
                  pickTempId
                    ? 'Upload temp post to new post'
                    : 'Upload new post'
                }
                loading={false}
                onClick={pickTempId ? handleTempUpload : handleUpload}
              />
            </>
          )}
        </div>
        {modifyPostId ? '' : <TempPostBox userId={user.id} />}
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

import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import '@toast-ui/editor/dist/toastui-editor.css';
import {
  initialPostStatusVar,
  initialWrittePostVar,
  postStatusVar,
  userInfoVar,
  writtenPostVar,
} from 'cache/common/common.cache';
import { Button } from 'components/common/button/Button';
import PageChange from 'components/pageChange/PageChange';
import UploadDialog from 'components/upload/UploadDialog';
import {
  CREATE_POST_MUTATION,
  CREATE_TEMP_MUTATION,
  MODIFY_POST,
  MODIFY_TEMP_MUTATION,
  UPLOAD_TEMP_MUTATION,
} from 'graphql/mutations';
import { GET_CATEGORY_BY_USER_ROLE } from 'graphql/queries';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getCategoryByUserRole } from 'src/__generated__/getCategoryByUserRole';
import { modifyPost, modifyPostVariables } from 'src/__generated__/modifyPost';
import { uploadTemp, uploadTempVariables } from 'src/__generated__/uploadTemp';
import CategorySelector from '../components/upload/CategorySelector';
import WysiwygEditor from '../components/upload/Editor';
import TempPostBox from '../components/upload/TempPostBox';
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

interface IDialog {
  visible: boolean;
  title: string;
  content: string;
}

const Upload = () => {
  const user = useReactiveVar(userInfoVar);
  const post = useReactiveVar(writtenPostVar);
  const router = useRouter();
  const [dialogVar, setDialogVar] = useState<IDialog>({
    visible: false,
    title: '',
    content: '',
  });

  const { data, loading, error } = useQuery<getCategoryByUserRole>(
    GET_CATEGORY_BY_USER_ROLE,
    {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'network-only',
    }
  );

  const { pickTempId, isModify, modifyPostId } = useReactiveVar(postStatusVar);
  const {
    title,
    contents,
    titleImg,
    firstCategoryName,
    secondCategoryName,
    crewId,
    brandId,
  } = post;

  const alertOnConfirm = () => {
    setDialogVar({
      title: '',
      content: '',
      visible: false,
    });
    router.push('/');
  };
  const alertOnCancel = () => {
    setDialogVar({
      title: '',
      content: '',
      visible: false,
    });
    router.push('/');
  };

  const createPostonCompleted = (data: createPost) => {
    if (data?.createPost.ok) {
      writtenPostVar({ ...initialWrittePostVar });
      postStatusVar({ ...initialPostStatusVar });
      alert('새로운 게시물 업로드를 완료했습니다.');
      setDialogVar({
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
      writtenPostVar({ ...initialWrittePostVar });
      postStatusVar({ ...initialPostStatusVar, isTemp: true }); //에디터 내부에서 리셋을 위해 isTemp true설정
      setDialogVar({
        title: '임시 게시물',
        content: '새로운 임시저장 게시물 저장을 완료하였습니다. :)',
        visible: true,
      });
    }

    if (data?.createTemp.error) {
      alert(
        `${data.createTemp.error}. \n문제가 지속되면 관리자에게 문의해주세요 :)`
      );
    }
  };

  const ModifyTempOnCompleted = (data: modifyTemp) => {
    if (data?.modifyTemp.ok) {
      setDialogVar({
        title: '임시 게시물',
        content: '임시저장 게시물 저장이 완료되었습니다. :)',
        visible: true,
      });
    }

    if (data?.modifyTemp.error) {
      alert(
        `${data.modifyTemp.error}. \n문제가 지속되면 관리자에게 문의해주세요 :)`
      );
    }
  };

  const uploadMutationOnCompleted = (data: uploadTemp) => {
    if (data?.uploadTemp.ok) {
      setDialogVar({
        title: '임시 게시물',
        content: '임시저장 게시물의 업로드가 완료되었습니다. :)',
        visible: true,
      });
    }

    if (data?.uploadTemp.error) {
      alert(
        `${data.uploadTemp.error}. \n문제가 지속되면 관리자에게 문의해주세요 :)`
      );
    }
  };
  const modifyPostOnCompleted = (data: modifyPost) => {
    if (data.modifyPost.ok) {
      const modifyPostId = postStatusVar().modifyPostId;
      postStatusVar({
        ...postStatusVar(),
        isModify: false,
        modifyPostId: null,
      });

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
          firstCategoryName,
          secondCategoryName,
        },
      },
    });
  };

  const handleTempModify = () => {
    console.log('check for clicking');
    modifyTempMutation({
      variables: {
        input: {
          postId: pickTempId,
          title,
          contents,
          titleImg,
          firstCategoryName,
          secondCategoryName,
          crewId,
          brandId,
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
          firstCategoryName,
          secondCategoryName,
          crewId,
          brandId,
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
          firstCategoryName,
          secondCategoryName,
          tempId: pickTempId,
          crewId,
          brandId,
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
          firstCategoryName,
          secondCategoryName,
          postId: modifyPostId,
          crewId,
          brandId,
        },
      },
    });
  };

  const clickTitleImageCallbackFn = (e: MouseEvent) => {
    const el = e.target as HTMLElement;
    const src = el.getAttribute('src');

    if (el.tagName === 'IMG' && e.type === 'click') {
      //Wrapper.tsx에 클래스 스타일 정의되어 있음.
      document.querySelectorAll('.folks-titleImg').forEach((inDoc) => {
        inDoc.classList.remove('folks-titleImg');
      });

      el.classList.add('folks-titleImg');
      writtenPostVar({ ...writtenPostVar(), titleImg: src });
    }
  };

  const handleTitleImage = () => {
    const container = document.querySelectorAll('.toastui-editor-ww-container');
    const imgTag = container[0] && container[0].getElementsByTagName('img');

    //posts내의 전체 노드에서 img중 Src를 가진놈이  titleImg의 값과 똑같은 애한테
    //클래스를 부여해주고 사라지면 될듯
    if (imgTag && imgTag.length === 2) {
      //tui editor에서 이미지 업로드하면 img 태그 두개씩 생기므로 2개로 정함
      imgTag[0]?.classList.add('folks-titleImg');
      writtenPostVar({
        ...writtenPostVar(),
        titleImg: imgTag[0].getAttribute('src'),
      });
      imgTag[0].addEventListener('click', (e: MouseEvent) => {
        clickTitleImageCallbackFn(e);
      });
    }

    if (imgTag && imgTag.length) {
      for (let i = 0; i < imgTag.length; i++) {
        imgTag[i].addEventListener('click', (e: MouseEvent) => {
          clickTitleImageCallbackFn(e);
        });

        if (imgTag[i].getAttribute('src') === post.titleImg) {
          imgTag[i]?.classList.add('folks-titleImg');
        }
      }
    }
  };

  useEffect(() => {
    // ref : https://stackoverflow.com/questions/15875128/is-there-element-rendered-event

    const observer = new MutationObserver((mutations) => {
      handleTitleImage();
      if (
        document.contains(document.getElementsByClassName('folks-titleImg')[0])
      ) {
        handleTitleImage();
        observer.disconnect();
      }
    });

    observer.observe(document, {
      attributes: false,
      childList: true,
      characterData: false,
      subtree: true,
    });
    return () => {
      postStatusVar({ ...initialPostStatusVar });
      writtenPostVar({ ...initialWrittePostVar });
    };
  }, []);

  if (error) {
    alert('에러가 발생했습니다 메인화면으로 다시 돌아갑니다.');
    router.push('/');
    return <div>Error!</div>;
  }

  if (loading) {
    return <PageChange />;
  }
  if (createPostLoading || createTempLoading || ModifyTempLoading)
    return <PageChange />;

  return (
    <>
      <div className="wrapper">
        <CategorySelector
          firstCategory={data?.getCategoryByUserRole.firstCategory}
          brands={data?.getCategoryByUserRole.brands}
          crews={data?.getCategoryByUserRole.crews}
        />

        <WysiwygEditor
          autofocus={false}
          initialValue={''}
          height={'90vh'}
          onChange={(contents) => {
            writtenPostVar({ ...post, contents });
            handleTitleImage();
          }}
        />

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
                canClick={true}
                actionText={
                  pickTempId ? 'Modifications completed' : 'Temporarily Save'
                }
                loading={false}
                onClick={pickTempId ? handleTempModify : handleTempSave}
              />
              <Button
                canClick={true}
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
        {modifyPostId ? (
          ''
        ) : (
          <TempPostBox tempPosts={data?.getCategoryByUserRole.tempPosts} />
        )}
        <UploadDialog
          visible={dialogVar.visible}
          title={dialogVar.title}
          content={dialogVar.content}
          onCancel={alertOnConfirm}
          onConfirm={alertOnCancel}
        />
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

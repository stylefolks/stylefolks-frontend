import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import {
  initialPostStatusVar,
  initialWrittePostVar,
  postStatusVar,
  userInfoVar,
  writtenPostVar,
} from 'cache/common/common.cache';
import {
  CREATE_POST_MUTATION,
  CREATE_TEMP_MUTATION,
  MODIFY_POST,
  MODIFY_TEMP_MUTATION,
  UPLOAD_TEMP_MUTATION,
} from 'graphql/upload/mutations';
import { GET_CATEGORY_BY_USER_ROLE } from 'graphql/upload/queries';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { createPost, createPostVariables } from 'src/__generated__/createPost';
import { createTemp, createTempVariables } from 'src/__generated__/createTemp';
import { getCategoryByUserRole } from 'src/__generated__/getCategoryByUserRole';
import { modifyPost, modifyPostVariables } from 'src/__generated__/modifyPost';
import { modifyTemp, modifyTempVariables } from 'src/__generated__/modifyTemp';
import { uploadTemp, uploadTempVariables } from 'src/__generated__/uploadTemp';
import useHandleUploadRes from './useUploadRes';

interface IDialog {
  visible: boolean;
  title: string;
  content: string;
}

const useUpload = () => {
  const user = useReactiveVar(userInfoVar);
  const post = useReactiveVar(writtenPostVar);
  const router = useRouter();
  const { state: resState, actions: resActions } = useHandleUploadRes();
  const { dialogVar } = resState;
  const {
    alertOnConfirm,
    alertOnCancel,
    createPostonCompleted,
    createTemponCompleted,
    ModifyTempOnCompleted,
    uploadMutationOnCompleted,
    modifyPostOnCompleted,
  } = resActions;

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

  return {
    state: {
      data,
      loading,
      error,
      post,
      pickTempId,
      modifyPostId,
      dialogVar,
      createPostLoading,
      createTempLoading,
      ModifyTempLoading,
      modifyPostError,
      modifyPostLoading,
      router,
    },
    actions: {
      alertOnCancel,
      alertOnConfirm,
      handleTempUpload,
      handleUpload,
      handleTempSave,
      handleTempModify,
      handleModifyDone,
      handleTitleImage,
    },
  };
};

export default useUpload;

import {
  initialPostStatusVar,
  initialWrittePostVar,
  postStatusVar,
  writtenPostVar,
} from 'cache/common/common.cache';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { createPost } from 'src/__generated__/createPost';
import { createTemp } from 'src/__generated__/createTemp';
import { modifyPost } from 'src/__generated__/modifyPost';
import { modifyTemp } from 'src/__generated__/modifyTemp';
import { uploadTemp } from 'src/__generated__/uploadTemp';

interface IDialog {
  visible: boolean;
  title: string;
  content: string;
}

const useHandleUploadRes = () => {
  const router = useRouter();
  const [dialogVar, setDialogVar] = useState<IDialog>({
    visible: false,
    title: '',
    content: '',
  });
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

  return {
    state: {
      dialogVar,
    },
    actions: {
      alertOnConfirm,
      alertOnCancel,
      createPostonCompleted,
      createTemponCompleted,
      ModifyTempOnCompleted,
      uploadMutationOnCompleted,
      modifyPostOnCompleted,
    },
  };
};

export default useHandleUploadRes;

import { useMutation, useReactiveVar } from '@apollo/client';
import {
  initialWrittePostVar,
  postStatusVar,
  writtenPostVar,
} from 'cache/common/common.cache';
import { DELETE_TEMP } from 'graphql/upload/mutations';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { deleteTemp, deleteTempVariables } from 'src/__generated__/deleteTemp';
import { getCategoryByUserRole_getCategoryByUserRole_tempPosts } from 'src/__generated__/getCategoryByUserRole';
import { FirstCategoryName } from 'src/__generated__/globalTypes';
import UtilStyle from 'styles/common/Util.module.scss';
import TempStyle from 'styles/post/TempPost.module.scss';
import TempUploadDialog from './TempUploadDialog';

interface IProps {
  tempPosts: getCategoryByUserRole_getCategoryByUserRole_tempPosts[] | null;
}

interface IDialog {
  visible: boolean;
  title: string;
  content: string;
}

const TempPostBox: React.FC<IProps> = ({ tempPosts }) => {
  const router = useRouter();
  const postStatus = useReactiveVar(postStatusVar);
  const [alert, setAlert] = useState<IDialog>({
    visible: false,
    title: '',
    content: '',
  });
  const { pickTempId, prevTempId } = postStatus;

  const onDeleteCompleted = (data: deleteTemp) => {
    if (data?.deleteTemp.ok) {
      window.location.reload();
    }
  };

  const [deleteTempMutation, { data, loading, error }] = useMutation<
    deleteTemp,
    deleteTempVariables
  >(DELETE_TEMP, { onCompleted: onDeleteCompleted });

  const confirmDelete = (postId: number) => {
    postStatusVar({ ...postStatus, pickTempId: null });
    prevTempId ? postStatusVar({ ...postStatus, prevTempId: null }) : '';
    deleteTempMutation({
      variables: {
        postId,
      },
    });
  };

  const confirmLogging = () => {
    postStatusVar({ ...postStatus, prevTempId: postStatus.pickTempId });
    const PickTemp = tempPosts.filter((el) => el.id === pickTempId);
    const { image, firstCategory, secondCategory, ...input } = PickTemp[0];

    const titleImageArr = image.map((el) => el.link);

    writtenPostVar({
      ...input,
      firstCategoryName: firstCategory.name as FirstCategoryName,
      secondCategoryName: secondCategory.name,
    });

    postStatusVar({ ...postStatus, titleImageArr, isTemp: true });
  };

  const confirmBackToNewPost = () => {
    writtenPostVar({ ...initialWrittePostVar });
    postStatusVar({
      ...postStatus,
      pickTempId: null,
      isTemp: true,
      titleImageArr: [],
    });
  };

  const handleBackToNewPost = () => {
    setAlert({
      title: '새로운 게시글 작성',
      content: `새로운 게시글을 작성하시겠습니까? \n 저장하지 않으신 글은 반영되지 않습니다.`,
      visible: true,
    });
  };

  const handleLogging = (
    el: getCategoryByUserRole_getCategoryByUserRole_tempPosts
  ) => {
    postStatusVar({ ...postStatus, pickTempId: el.id });

    setAlert({
      title: '임시저장 불러오기',
      content: `${el.title}를 불러옵니다.`,
      visible: true,
    });
  };

  const handleDelete = (
    el: getCategoryByUserRole_getCategoryByUserRole_tempPosts
  ) => {
    postStatusVar({ ...postStatus, pickTempId: el.id });

    setAlert({
      title: '임시저장 게시글 삭제하기',
      content: `${el.title}를 삭제하시겠습니까?`,
      visible: true,
    });
  };

  const onCancel = () => {
    setAlert({ title: '', content: '', visible: false });
    postStatusVar({ ...postStatus, pickTempId: prevTempId });

    if (alert.title === '임시 게시물' || alert.title === '새로운 게시물') {
      router.push('/');
      return;
    }

    if (alert.title === '임시저장 불러오기') {
      setAlert({ title: '', content: '', visible: false });
      return;
    }

    if (alert.title !== '새로운 게시글 작성') {
      postStatusVar({ ...postStatus, isTemp: false });

      return;
    }
  };

  const onConfirm = () => {
    setAlert({ title: '', content: '', visible: false });

    if (alert.title === '새로운 게시글 작성') {
      return confirmBackToNewPost();
    }

    if (alert.title === '임시저장 게시글 삭제하기') {
      return confirmDelete(pickTempId);
    }

    if (alert.title === '임시저장 불러오기') {
      return confirmLogging();
    }

    if (alert.title === '임시 게시물' || alert.title === '새로운 게시물') {
      router.push('/');
      return;
    }

    // if (alert.title === '수정 게시물') {

    // }
  };

  return tempPosts?.length ? (
    <div className={TempStyle.tempContainer}>
      <div className={TempStyle.tempWrapper}>
        <h3>Save Posting List</h3>
        <ul>
          {tempPosts.length &&
            tempPosts.map((el) => (
              <li
                key={el.id}
                className={el.id === pickTempId ? UtilStyle.isActiveColor : ''}
              >
                <div>
                  <span
                    onClick={() => el.id !== pickTempId && handleLogging(el)}
                  >
                    Story Of {el.title}
                  </span>{' '}
                  <button onClick={() => handleDelete(el)}>x</button>
                </div>
              </li>
            ))}
        </ul>
        {pickTempId && (
          <button
            className={TempStyle.backButton}
            onClick={() => handleBackToNewPost()}
          >
            Back To Wirte New Post
          </button>
        )}
        <TempUploadDialog
          visible={alert.visible}
          title={alert.title}
          content={alert.content}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      </div>
    </div>
  ) : (
    <></>
  );
};
export default TempPostBox;

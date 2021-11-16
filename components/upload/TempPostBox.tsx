import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import {
  alertVar,
  initialWrittePostVar,
  postStatusVar,
  userInfoVar,
  writtenPostVar,
} from 'cache/common/common.cache';
import Alert from 'components/common/Alert';
import { DELETE_TEMP } from 'graphql/mutations';
import { GET_USER_TEMP } from 'graphql/queries';
import { useRouter } from 'next/router';
import React from 'react';
import { deleteTemp, deleteTempVariables } from 'src/__generated__/deleteTemp';
import {
  getUserTemp,
  getUserTempVariables,
  getUserTemp_getUserTemp_temps,
} from 'src/__generated__/getUserTemp';
import { FirstCategoryName } from 'src/__generated__/globalTypes';
import UtilStyle from 'styles/common/Util.module.scss';
import TempStyle from 'styles/TempPost.module.scss';

interface IProps {
  userId: number;
}

const TempPostBox: React.FC<IProps> = ({ userId }) => {
  const router = useRouter();
  const postStatus = useReactiveVar(postStatusVar);
  const { pickTempId, prevTempId } = postStatus;
  const alert = useReactiveVar(alertVar);
  const user = useReactiveVar(userInfoVar);

  const {
    data: userTempData,
    loading: postLoading,
    error: poseError,
  } = useQuery<getUserTemp, getUserTempVariables>(GET_USER_TEMP, {
    variables: {
      userId: user.id,
    },
    nextFetchPolicy: 'network-only',
    fetchPolicy: 'network-only',
  });

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
    const PickTemp = userTempData.getUserTemp.temps.filter(
      (el) => el.id === pickTempId
    );
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
    alertVar({
      title: '새로운 게시글 작성',
      content: `새로운 게시글을 작성하시겠습니까? \n 저장하지 않으신 글은 반영되지 않습니다.`,
      visible: true,
    });
  };

  const handleLogging = (el: getUserTemp_getUserTemp_temps) => {
    postStatusVar({ ...postStatus, pickTempId: el.id });

    // dispatch(setPickTempId(el.id));

    alertVar({
      title: '임시저장 불러오기',
      content: `${el.title}를 불러옵니다.`,
      visible: true,
    });
  };

  const handleDelete = (el: getUserTemp_getUserTemp_temps) => {
    postStatusVar({ ...postStatus, pickTempId: el.id });

    // dispatch(setPickTempId(el.id));

    alertVar({
      title: '임시저장 게시글 삭제하기',
      content: `${el.title}를 삭제하시겠습니까?`,
      visible: true,
    });
  };

  const onCancel = () => {
    alertVar({ title: '', content: '', visible: false });
    postStatusVar({ ...postStatus, pickTempId: prevTempId });

    // dispatch(setPickTempId(prevTempId));

    if (alert.title === '임시 게시물' || alert.title === '새로운 게시물') {
      router.push('/');
      return;
    }

    if (alert.title === '임시저장 불러오기') {
      alertVar({ title: '', content: '', visible: false });
      return;
    }

    if (alert.title !== '새로운 게시글 작성') {
      // dispatch(setPickTempId(null));
      postStatusVar({ ...postStatus, isTemp: false });
      // dispatch(setIsTemp(false));
      return;
    }
  };

  const onConfirm = () => {
    alertVar({ title: '', content: '', visible: false });

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
  };

  return userTempData?.getUserTemp.temps.length ? (
    <div className={TempStyle.tempContainer}>
      <div className={TempStyle.tempWrapper}>
        <h3>Save Posting List</h3>
        <ul>
          {userTempData?.getUserTemp.temps.length &&
            userTempData?.getUserTemp.temps.map((el) => (
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
        <Alert onCancel={onCancel} onConfirm={onConfirm} />
      </div>
    </div>
  ) : (
    <></>
  );
};
export default TempPostBox;

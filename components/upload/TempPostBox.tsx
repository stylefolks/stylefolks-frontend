import { useMutation, useQuery } from '@apollo/client';
import Alert from 'components/common/Alert';
import { DELETE_TEMP } from 'graphql/mutations';
import { GET_USER_TEMP } from 'graphql/queries';
import { userInfoVar } from 'lib/apolloClient';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTemp, deleteTempVariables } from 'src/__generated__/deleteTemp';
import {
  getUserTemp,
  getUserTempVariables,
  getUserTemp_getUserTemp_temps,
} from 'src/__generated__/getUserTemp';
import { RootState } from 'store/modules';
import { setAlert, unmountAlert } from 'store/modules/commonReducer';
import TempStyle from 'styles/TempPost.module.scss';
import UtilStyle from 'styles/Util.module.scss';
import {
  initializeUploadState,
  setIsTemp,
  setPickTempId,
  setPrevTempId,
  setTitleImageArr,
  upadatePost,
} from '../../store/modules/uploadReducer';
interface IProps {
  userId: number;
}

const TempPostBox: React.FC<IProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pickTempId, prevTempId } = useSelector(
    (state: RootState) => state.upload
  );
  const { alert } = useSelector((state: RootState) => state.common);

  const {
    data: userTempData,
    loading: postLoading,
    error: poseError,
  } = useQuery<getUserTemp, getUserTempVariables>(GET_USER_TEMP, {
    variables: {
      userId: userInfoVar().id,
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
    dispatch(setPickTempId(null));

    prevTempId ? dispatch(setPrevTempId(null)) : '';
    deleteTempMutation({
      variables: {
        postId,
      },
    });
  };

  const confirmLogging = () => {
    dispatch(setPrevTempId(pickTempId));
    const PickTemp = userTempData.getUserTemp.temps.filter(
      (el) => el.id === pickTempId
    );
    const { image, firstCategory, secondCategory, ...input } = PickTemp[0];

    const titleImageArr = image.map((el) => el.link);

    dispatch(
      upadatePost({
        ...input,
        firstCategoryId: firstCategory.id,
        secondCategoryId: secondCategory?.id,
        secondCategoryName: secondCategory?.name,
        firstCategoryName: firstCategory.name,
      })
    );

    dispatch(setTitleImageArr(titleImageArr));
    dispatch(setIsTemp(true));
  };

  const confirmBackToNewPost = () => {
    //아래 실행순서가 중요하다 -> 개선필요
    dispatch(setPickTempId(null));
    dispatch(initializeUploadState());
    dispatch(setIsTemp(true));
  };

  const handleBackToNewPost = () => {
    dispatch(
      setAlert({
        title: '새로운 게시글 작성',
        content: `새로운 게시글을 작성하시겠습니까? \n 저장하지 않으신 글은 반영되지 않습니다.`,
      })
    );
  };

  const handleLogging = (el: getUserTemp_getUserTemp_temps) => {
    dispatch(setPickTempId(el.id));

    dispatch(
      setAlert({
        title: '임시저장 불러오기',
        content: `${el.title}를 불러옵니다.`,
      })
    );
  };

  const handleDelete = (el: getUserTemp_getUserTemp_temps) => {
    dispatch(setPickTempId(el.id));
    dispatch(
      setAlert({
        title: '임시저장 게시글 삭제하기',
        content: `${el.title}를 삭제하시겠습니까?`,
      })
    );
  };

  const onCancel = () => {
    dispatch(unmountAlert());
    dispatch(setPickTempId(prevTempId));

    if (alert.title === '임시 게시물' || alert.title === '새로운 게시물') {
      router.push('/');
      return;
    }

    if (alert.title === '임시저장 불러오기') {
      dispatch(unmountAlert());
      return;
    }

    if (alert.title !== '새로운 게시글 작성') {
      // dispatch(setPickTempId(null));
      dispatch(setIsTemp(false));
      return;
    }
  };

  const onConfirm = () => {
    dispatch(unmountAlert());

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

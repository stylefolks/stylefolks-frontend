import { useLazyQuery, useMutation } from '@apollo/client';
import { DELETE_TEMP } from 'graphql/mutations';
import { GET_USER_TEMP } from 'graphql/queries';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTemp, deleteTempVariables } from 'src/__generated__/deleteTemp';
import {
  getUserTemp,
  getUserTempVariables,
  getUserTemp_getUserTemp_temps,
} from '../src/__generated__/getUserTemp';
import { RootState } from '../store/modules';
import { setAlert } from '../store/modules/commonReducer';
import {
  setIsTemp,
  setPickTempId,
  setTitleImageArr,
  upadatePost,
} from '../store/modules/uploadReducer';
import TempStyle from '../styles/TempPost.module.scss';
import Alert from './Alert';

interface IProps {
  userId: number;
}

const TempPostBox: React.FC<IProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const { pickTempId, titleImageArr, post } = useSelector(
    (state: RootState) => state.upload
  );
  const { alert } = useSelector((state: RootState) => state.common);

  const [
    getTempData,
    { data: userTempData, loading: postLoading, error: poseError },
  ] = useLazyQuery<getUserTemp, getUserTempVariables>(GET_USER_TEMP, {
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

  const handleLogging = (el: getUserTemp_getUserTemp_temps) => {
    dispatch(setPickTempId(el.id));
    dispatch(
      setAlert({
        portal: { mounted: true },
        alert: {
          title: '임시저장 불러오기',
          content: `${el.title}를 불러옵니다.`,
        },
      })
    );
  };

  const onCancel = () => {
    dispatch(setPickTempId(null));
    dispatch(setIsTemp(false));
    dispatch(
      setAlert({
        portal: { mounted: false },
        alert: {
          title: '',
          content: ``,
        },
      })
    );
  };

  const onConfirm = () => {
    dispatch(
      setAlert({
        portal: { mounted: false },
        alert: {
          title: '',
          content: ``,
        },
      })
    );

    if (alert.title === '임시저장 게시글 삭제하기') {
      return confirmDelete(pickTempId);
    }

    if (alert.title === '임시저장 불러오기') {
      return confirmLogging();
    }
  };

  const handleDelete = (el: getUserTemp_getUserTemp_temps) => {
    dispatch(setPickTempId(el.id));
    dispatch(
      setAlert({
        portal: { mounted: true },
        alert: {
          title: '임시저장 게시글 삭제하기',
          content: `${el.title}를 삭제하시겠습니까?`,
        },
      })
    );
  };

  const confirmDelete = (postId: number) => {
    dispatch(setPickTempId(null));

    deleteTempMutation({
      variables: {
        postId,
      },
    });
  };

  const confirmLogging = () => {
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
        firstCategoryName: firstCategory.name,
      })
    );

    dispatch(setTitleImageArr(titleImageArr));
    dispatch(setIsTemp(true));
  };

  useEffect(() => {
    userId &&
      getTempData({
        variables: {
          userId,
        },
      });
  }, [userId]);

  return userTempData?.getUserTemp.temps.length ? (
    <div className={TempStyle.tempContainer}>
      <div className={TempStyle.tempWrapper}>
        <h3>Temp Save Posting List</h3>

        <ul>
          {userTempData?.getUserTemp.temps.length &&
            userTempData?.getUserTemp.temps.map((el) => (
              <li key={el.id}>
                <div>
                  <span onClick={() => handleLogging(el)}>
                    Story Of {el.title}
                  </span>{' '}
                  <button onClick={() => handleDelete(el)}>x</button>
                </div>
              </li>
            ))}
        </ul>
        <Alert onCancel={onCancel} onConfirm={onConfirm} />
      </div>
    </div>
  ) : (
    <></>
  );
};
export default TempPostBox;

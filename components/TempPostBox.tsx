import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const GET_USER_TEMP = gql`
  query getUserTemp($userId: Int!) {
    getUserTemp(userId: $userId) {
      ok
      error
      temps {
        id
        title
        titleImg
        contents
        firstCategory {
          id
          name
        }
        secondCategory {
          id
          name
        }
        image {
          link
          id
        }
      }
    }
  }
`;
const TempPostBox: React.FC<IProps> = ({ userId }) => {
  const [
    getTempData,
    { data: userTempData, loading: postLoading, error: poseError },
  ] = useLazyQuery<getUserTemp, getUserTempVariables>(GET_USER_TEMP);
  const dispatch = useDispatch();
  const { pickTempId, titleImageArr, post } = useSelector(
    (state: RootState) => state.upload
  );
  useEffect(() => {
    userId &&
      getTempData({
        variables: {
          userId,
        },
      });
  }, [userId]);

  const onClick = (el: getUserTemp_getUserTemp_temps) => {
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
    const PickTemp = userTempData.getUserTemp.temps.filter(
      (el) => el.id === pickTempId
    );
    const { image, firstCategory, secondCategory, ...input } = PickTemp[0];
    console.log('@@@@', PickTemp);
    dispatch(setIsTemp(true));
    const titleImageArr = image.map((el) => el.link);
    console.log(input.contents);
    dispatch(
      upadatePost({
        ...input,
        firstCategoryId: firstCategory.id,
        secondCategoryId: secondCategory.id,
        firstCategoryName: firstCategory.name,
      })
    );
    console.log(titleImageArr);
    dispatch(setTitleImageArr(titleImageArr));
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

  return (
    <div className={TempStyle.tempContainer}>
      <div className={TempStyle.tempWrapper}>
        <h3>Temp Save Posting List</h3>

        <ul>
          {userTempData?.getUserTemp.temps.length &&
            userTempData?.getUserTemp.temps.map((el) => (
              <li key={el.id} onClick={() => onClick(el)}>
                Story Of {el.title}
              </li>

              // <li key={el.title}>{el.title}</li>
            ))}
        </ul>
        <Alert onCancel={onCancel} onConfirm={onConfirm} />
      </div>
    </div>
  );
};
export default TempPostBox;

import { useMutation } from '@apollo/client';
import Alert from 'components/common/Alert';
import BackDrop from 'components/common/BackDrop';
import { EDIT_PROFILE } from 'graphql/mutations';
import Modal from 'HOC/Modal';
import { useMe } from 'hooks/useMe';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  editProfile,
  editProfileVariables,
} from 'src/__generated__/editProfile';
import { RootState } from 'store/modules';
import {
  setAlert,
  setModal,
  setSpinner,
  unmountAlert,
} from 'store/modules/commonReducer';
import UploadModalStyle from 'styles/UploadModal.module.scss';

const UploadModal = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const ref = useRef<HTMLInputElement>(null);
  const { refetch, data: meData } = useMe();

  const onImageChangeCompleted = (data: editProfile) => {
    if (data.editProfile.ok) {
      dispatch(setSpinner(false));
      dispatch(
        setAlert({
          title: '프로필 이미지 수정',
          content: '프로필 이미지 수정이 완료되었습니다.',
        })
      );
    }

    if (data.editProfile.error) {
      alert('에러발생');
    }
  };
  const [editProfileMutation, { data, loading, error }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE, {
    onCompleted: onImageChangeCompleted,
  });

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setModal(false));
  };

  const uploadImage = async (formBody: FormData) => {
    try {
      dispatch(setModal(true));

      const { url } = await (
        await fetch('http://localhost:4000/images/user', {
          method: 'POST',
          body: formBody,
        })
      ).json();

      if (url) {
        editProfileMutation({
          variables: {
            input: {
              profileImg: url,
            },
          },
        });
      }
    } catch {
      dispatch(setAlert({ title: '에러발생', content: '이미지 업로드 에러' }));
    }
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      const formBody = new FormData();
      formBody.append('file', img);
      uploadImage(formBody);
    }
  };

  const onDelete = async () => {
    const body = JSON.stringify({ link: user.profileImg });

    const res = await (
      await fetch('http://localhost:4000/images/user', {
        method: 'PUT',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();

    if (res.status === 200) {
      //여기서 gql도 날려줘야할듯.

      editProfileMutation({
        variables: {
          input: {
            profileImg:
              'https://thefolksofstyle.s3.amazonaws.com/ef66e19d-e8d8-486d-8b5b-b4ef0101e1d9no-image.png',
          },
        },
      });
    }
  };

  const onConfirmAlert = () => {
    refetch(); //여기도 나중에 캐시만 업데이트 하는 방식으로 변경하자
    dispatch(unmountAlert());
    dispatch(setModal(false));
  };

  return (
    <>
      <Modal>
        <BackDrop>
          <section className={UploadModalStyle.uploadModalContainer}>
            <h2>Change Your Profile Image</h2>
            <button name="upload" onClick={() => ref.current.click()}>
              Upload Photo
            </button>
            <button onClick={onDelete}>Remove Current Photo</button>
            <button onClick={onClick}>Cancel</button>
            <input
              ref={ref}
              id="uploadProfileImage"
              type="file"
              accept="image/*"
              name="profileImage"
              onChange={onImageChange}
            />
          </section>
        </BackDrop>
      </Modal>
      <Alert onConfirm={onConfirmAlert} />
    </>
  );
};

export default UploadModal;

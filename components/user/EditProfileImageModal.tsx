import { useMutation, useReactiveVar } from '@apollo/client';
import { alertVar, userInfoVar } from 'cache/common/common.cache';
import { isVisibleProfileImageModalVar } from 'cache/user/user.cache';
import BackDrop from 'components/common/BackDrop';
import { EDIT_PROFILE } from 'graphql/mutations';
import Modal from 'HOC/Modal';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  editProfile,
  editProfileVariables,
} from 'src/__generated__/editProfile';
import { setSpinner } from 'store/modules/commonReducer';
import UploadModalStyle from 'styles/UploadModal.module.scss';

const EditProfileImageModal = () => {
  const dispatch = useDispatch();
  const user = userInfoVar();
  const ref = useRef<HTMLInputElement>(null);
  const modal = useReactiveVar(isVisibleProfileImageModalVar);

  const onImageChangeCompleted = (data: editProfile) => {
    if (data.editProfile.ok) {
      dispatch(setSpinner(false));

      alertVar({
        title: '프로필 이미지 수정',
        content: '프로필 이미지 수정이 완료되었습니다.',
        visible: true,
      });
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
    isVisibleProfileImageModalVar(false);
  };

  const uploadImage = async (formBody: FormData) => {
    try {
      isVisibleProfileImageModalVar(true);

      const { url } = await (
        await fetch('http://localhost:4000/images/user', {
          method: 'POST',
          body: formBody,
          headers: {
            'folks-token': localStorage.getItem('folks-token'),
          },
        })
      ).json();

      if (url) {
        editProfileMutation({
          variables: {
            input: {
              nickname: user.nickname,
              link: user.link,
              profileImg: url,
            },
          },
        });
      }
    } catch (e) {
      console.error(e);
      alertVar({
        title: '에러발생',
        content: '이미지 업로드 에러',
        visible: true,
      });
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
          'folks-token': localStorage.getItem('folks-token'),
        },
      })
    ).json();

    if (res.status === 200) {
      //여기서 gql도 날려줘야할듯.
      //백에서 막자

      editProfileMutation({
        variables: {
          input: {
            nickname: user.nickname,
            link: user.link,
            profileImg: user.profileImg,
          },
        },
      });
    }
  };

  return (
    <>
      <Modal visible={modal}>
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
      {/* <Alert onConfirm={onConfirmAlert} /> */}
    </>
  );
};

export default EditProfileImageModal;

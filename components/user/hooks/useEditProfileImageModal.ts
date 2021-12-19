import { useMutation, useReactiveVar } from '@apollo/client';
import {
  alertVar,
  spinnerVisibleVar,
  userInfoVar,
} from 'cache/common/common.cache';
import { isVisibleProfileImageModalVar } from 'cache/user/user.cache';
import { folksServerNoGql } from 'config';
import { EDIT_PROFILE } from 'graphql/mutations';
import React, { useRef } from 'react';
import {
  editProfile,
  editProfileVariables,
} from 'src/__generated__/editProfile';

const useEditProfileImageModal = () => {
  const user = userInfoVar();
  const ref = useRef<HTMLInputElement>(null);
  const modal = useReactiveVar(isVisibleProfileImageModalVar);

  const onImageChangeCompleted = (data: editProfile) => {
    if (data.editProfile.ok) {
      spinnerVisibleVar(false);
      isVisibleProfileImageModalVar(false);
      alertVar({
        title: '프로필 이미지 수정',
        content: '프로필 이미지 수정이 완료되었습니다.',
        visible: true,
      });
    }

    if (data.editProfile.error) {
      isVisibleProfileImageModalVar(true);
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
        await fetch(`${folksServerNoGql}/images/user`, {
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
      await fetch(`${folksServerNoGql}/images/user`, {
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

  return {
    state: { ref, modal },
    actions: { onDelete, onClick, onImageChange },
  };
};

export default useEditProfileImageModal;

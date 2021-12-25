import { useMutation, useReactiveVar } from '@apollo/client';
import { userInfoVar } from 'cache/common/common.cache';
import { isVisibleProfileImageModalVar } from 'cache/user/user.cache';
import { folksServerNoGql } from 'config';
import { EDIT_PROFILE } from 'graphql/mutations';
import { useLazyMe } from 'hooks/useMe';
import React, { useRef } from 'react';
import {
  editProfile,
  editProfileVariables,
} from 'src/__generated__/editProfile';
import { createSpinner, removeSpinner } from 'utils/Utils';

interface IProps {
  doRefetch: () => void;
}

const useEditProfileImageModal = ({ doRefetch }: IProps) => {
  const user = useReactiveVar(userInfoVar);
  const [refetch] = useLazyMe();
  const ref = useRef<HTMLInputElement>(null);
  const modal = useReactiveVar(isVisibleProfileImageModalVar);

  const onImageChangeCompleted = (data: editProfile) => {
    if (data.editProfile.ok) {
      removeSpinner();

      isVisibleProfileImageModalVar(false);
      alert('프로필 이미지 수정이 완료되었습니다.');
      refetch(); //lazy를 해야 훅이 호출되자마자 불리는게 아니므로 변경이되지!
      doRefetch();
    }

    if (data.editProfile.error) {
      isVisibleProfileImageModalVar(true);
      alert('에러발생');
    }
  };
  const [editProfileMutation] = useMutation<editProfile, editProfileVariables>(
    EDIT_PROFILE,
    {
      onCompleted: onImageChangeCompleted,
    }
  );

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    isVisibleProfileImageModalVar(false);
  };

  const uploadImage = async (formBody: FormData) => {
    try {
      createSpinner();
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
      removeSpinner();
      alert('이미지 업로드 에러가 발생했습니다.');
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
    removeSpinner(); // 일단 BE수정 필요
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
      editProfileMutation({
        variables: {
          input: {
            nickname: user.nickname,
            link: user.link,
            profileImg: '../vacantImage.png',
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

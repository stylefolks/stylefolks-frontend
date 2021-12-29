import { useMutation } from '@apollo/client';
import { IUserInforVar, userInfoVar } from 'cache/common/common.cache';
import { isVisibleEditProfileModalVar } from 'cache/user/user.cache';
import { Button } from 'components/common/button/Button';
import { FormError } from 'components/common/FormError';
import { EDIT_PROFILE } from 'graphql/user/mutations';
import { useLazyMe } from 'hooks/common/useMe';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  editProfile,
  editProfileVariables,
} from 'src/__generated__/editProfile';
import EditProfileModalStyle from 'styles/user/component/EditProfileModal.module.scss';

interface EditUserInformation {
  modalNickname: string;
  modalLink: string;
}

interface EditUserInformationProps {
  nickname: string;
  link: string;
  user: IUserInforVar;
}

const EditUserInformation: React.FC<EditUserInformationProps> = ({
  nickname: exNickname,
  link: exLink,
  user,
}) => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<EditUserInformation>({ mode: 'onChange' });

  const [getAndSaveUserData] = useLazyMe();
  const route = useRouter();

  const onCompleted = (data: editProfile) => {
    if (data.editProfile.ok) {
      const { modalNickname, modalLink } = getValues();
      userInfoVar({
        ...user,
        link: modalLink,
        nickname: modalNickname,
      });
      isVisibleEditProfileModalVar(false);
      getAndSaveUserData();
      route.push(`/user/${modalNickname}`);
    }
  };

  const [editProfileMutation, {}] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE, {
    onCompleted,
  });

  const onSubmit = () => {
    //react-hook-form은 리렌더가 되어 값이 변경되는것이 아니므로 호출시점에 값을 들고와야한다.
    const { modalNickname, modalLink } = getValues();
    editProfileMutation({
      variables: {
        input: {
          link: modalLink,
          nickname: modalNickname,
          profileImg: user.profileImg,
        },
      },
    });
  };

  return (
    <>
      <form
        className={EditProfileModalStyle.inputWrapper}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="modalNickname">NickName</label>
        <input
          {...register('modalNickname', {
            required: '닉네임을 입력해주세여',
            minLength: 4,
            pattern: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/gi,
          })}
          defaultValue={exNickname}
          name="modalNickname"
          type="text"
        />
        {errors.modalNickname?.type === 'pattern' && (
          <FormError errorMessage={'닉네임은 한글, 영어, 숫자만 가능합니다.'} />
        )}
        {errors.modalNickname?.message && (
          <FormError errorMessage={errors.modalNickname?.message} />
        )}
        {errors.modalNickname?.type === 'minLength' && (
          <FormError errorMessage={'4자 이상 입력해주세요.'} />
        )}
        <label htmlFor="modalLink">Link</label>
        <input
          type="text"
          {...register('modalLink', {
            required: '개인 링크(블로그, SNS 등)를 입력해주세요',
            pattern:
              /(http[s]?|ftp):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}/g,
          })}
          defaultValue={exLink}
          name="modalLink"
        />
        {errors.modalLink?.message && (
          <FormError errorMessage={errors.modalLink?.message} />
        )}
        {errors.modalLink?.type === 'pattern' && (
          <FormError
            errorMessage={'링크 양식을 지켜주세요. ex)http://www.the-folks.com'}
          />
        )}
        <Button
          actionText={
            isValid ? '닉네임, 링크 변경하기' : '닉네임과 링크를 확인해주세요'
          }
          loading={false}
          canClick
        />
        <Button
          actionText="나가기"
          onClick={() => isVisibleEditProfileModalVar(false)}
          loading={false}
          canClick
        />
      </form>
    </>
  );
};

export default EditUserInformation;

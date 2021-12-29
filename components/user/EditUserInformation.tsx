import { IUserInforVar } from 'cache/common/common.cache';
import { isVisibleEditProfileModalVar } from 'cache/user/user.cache';
import { Button } from 'components/common/button/Button';
import { FormError } from 'components/common/FormError';
import useEditInformation from 'hooks/pages/user/components/useEditInformation';
import React from 'react';
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

const EditUserInformation: React.FC<EditUserInformationProps> = ({}) => {
  const { state, actions } = useEditInformation();
  const { user, isValid, errors } = state;
  const { onSubmit, register, handleSubmit } = actions;

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
          defaultValue={user.nickname}
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
          defaultValue={user.link}
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

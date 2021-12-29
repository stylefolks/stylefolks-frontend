import { Button } from 'components/common/button/Button';
import { FormError } from 'components/common/FormError';
import React from 'react';
import { useForm } from 'react-hook-form';
import UtilStyle from 'styles/common/Util.module.scss';
import EditProfileModalStyle from 'styles/user/component/EditProfileModal.module.scss';

interface EditProfileForm {
  email: string;
  modalPassword: string;
  changePassword: string;
  checkChangePassword: string;
}

interface EditUserInfoProps {
  userEmail: string;
}

const EditUserPassword: React.FC<EditUserInfoProps> = ({ userEmail }) => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<EditProfileForm>({ mode: 'onChange' });

  const { modalPassword, changePassword, checkChangePassword, email } =
    getValues();

  const onSubmit = () => {
    console.log(getValues()); //mutation here
  };
  return (
    <>
      <form
        className={EditProfileModalStyle.inputWrapper}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="email">Email</label>
        <input
          {...register('email', {
            required: '이메일을 입력해주세요',
            value: userEmail,
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          className={UtilStyle.input}
          id="email"
          type="text"
          disabled
          autoComplete="off"
        />
        <label htmlFor="modalPassword">Current Password *</label>
        <input
          {...register('modalPassword', {
            required: '비밀번호를 입력해주세요.',
            // minLength: 10,
          })}
          placeholder="Password"
          name="modalPassword"
          type="password"
          className={UtilStyle.input}
          autoComplete="off"
        />

        <label htmlFor="changePassword">Change Password *</label>
        <input
          {...register('changePassword', {
            required: '변경할 비밀번호를 입력해주세요.',
            // minLength: 10,
          })}
          name="changePassword"
          type="password"
          placeholder="Type Change Password"
          className={UtilStyle.input}
          autoComplete="off"
        />
        <label htmlFor="checkChangePassword">Repeat Password *</label>
        <input
          {...register('checkChangePassword', {
            required: '변경할 비밀번호 확인을 위해 입력해주세요.',
            validate: (value) =>
              value === changePassword ||
              '변경할 비밀번호가 일치하지 않습니다.',
          })}
          name="checkChangePassword"
          type="password"
          required
          placeholder="Check Change Password"
          className={UtilStyle.input}
          autoComplete="off"
        />
        <div className={UtilStyle.errorFormWrapper}>
          {errors.checkChangePassword?.message && (
            <FormError errorMessage={errors.checkChangePassword?.message} />
          )}
        </div>
        <Button actionText="비밀번호 변경하기" loading={false} canClick />
      </form>
    </>
  );
};

export default EditUserPassword;
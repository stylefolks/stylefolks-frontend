import { useMutation } from '@apollo/client';
import { isVisibleEditProfileModalVar } from 'cache/user/user.cache';
import { CHANGE_PASSWORD } from 'graphql/user/mutations';
import { useForm } from 'react-hook-form';
import {
  changePassword,
  changePasswordVariables,
} from 'src/__generated__/changePassword';

interface EditProfileForm {
  email: string;
  modalPassword: string;
  changePassword: string;
  checkChangePassword: string;
}
const useEditPassword = () => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<EditProfileForm>({ mode: 'onChange' });

  const onCompletedChangePw = (data: changePassword) => {
    if (!data.changePassword.ok) {
      alert(data.changePassword.error);
      return;
    }

    isVisibleEditProfileModalVar(false);
    alert('비밀번호 변경이 완료되었습니다');
  };

  const [changePasswordMutation, { loading, error: changePasswordError }] =
    useMutation<changePassword, changePasswordVariables>(CHANGE_PASSWORD, {
      onCompleted: onCompletedChangePw,
    });
  const onSubmit = () => {
    const { modalPassword, changePassword } = getValues();

    changePasswordMutation({
      variables: {
        input: {
          password: modalPassword,
          changePassword: changePassword,
        },
      },
    });
  };

  return {
    state: { loading, isValid, errors, changePasswordError },
    actions: { register, onSubmit, handleSubmit, getValues },
  };
};

export default useEditPassword;

import { ApolloError, useMutation } from '@apollo/client';
import { CREATE_ACCOUNT_MUTATION } from 'graphql/user/mutations';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  createAccount,
  createAccountVariables,
} from 'src/__generated__/createAccount';
import { UserRole } from 'src/__generated__/globalTypes';

interface ICreateAccountForm {
  email: string;
  password: string;
  checkPassword: string;
  nickname: string;
}
const useCreateAccount = () => {
  const router = useRouter();

  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ICreateAccountForm>({
    mode: 'onChange',
  });

  const { password, checkPassword, email, nickname } = getValues();

  const onCompleted = (data: createAccount) => {
    if (data.createAccount.ok) {
      alert('가입하신 메일을 통해 인증을 완료해주세요!');
      router.push('/');
    }
  };
  const onError = (error: ApolloError) => {
    alert(error);
  };

  const onSubmit = () => {
    //role은 유저로 자동  넘어가는게 정상
    if (!loading) {
      createAccountMutation({
        variables: {
          createAccountInput: {
            email,
            password,
            nickname,
            role: UserRole.User,
          },
        },
      });
    }
  };

  const [
    createAccountMutation,
    { data: createAccountMuataionResult, loading },
  ] = useMutation<createAccount, createAccountVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
      onError,
    }
  );

  return {
    state: {
      errors,
      isValid,
      loading,
      password,
      createAccountMuataionResult,
    },
    actions: { handleSubmit, onSubmit, register },
  };
};

export default useCreateAccount;

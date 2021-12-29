import { ApolloError, useMutation } from '@apollo/client';
import { authTokenVar, isLoggedInVar } from 'cache/common/common.cache';
import { LOGIN_MUTATION } from 'graphql/user/mutations';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { login, loginVariables } from 'src/__generated__/login';
import { useLazyMe } from './../../common/useMe';

interface ILoginForm {
  email: string;
  password: string;
}

const useLogin = () => {
  const router = useRouter();
  const [refetch] = useLazyMe();
  const doUseMeRefetch = () => {
    refetch();
  };

  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ILoginForm>({
    mode: 'onChange',
  });

  if (router.query.keyword === 'true') {
    router.push('/login');
  }

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();

      loginMutation({
        variables: {
          loginInput: { email, password },
        },
      });
    }
  };

  const onCompleted = (data: login) => {
    const {
      login: { error, ok, token },
    } = data;

    if (ok && token) {
      localStorage.setItem('folks-token', token);
      if (localStorage.getItem('folks-token')) {
        isLoggedInVar(true);
        authTokenVar(token);
        doUseMeRefetch();
        router.push('/');
      }
    } else {
      isLoggedInVar(false);
      if (error) {
        console.error(error);
        alert(`로그인 에러가 발생했습니다. : ${error}`);
      }
    }
  };

  const onError = (error: ApolloError) => {
    alert(`로그인 에러가 발생했습니다. : ${error}`);
  };

  const [loginMutation, { data: loginMutationResult, loading, error }] =
    useMutation<login, loginVariables>(LOGIN_MUTATION, {
      onCompleted,
      onError,
    });

  return {
    state: { isValid, loading, loginMutationResult, errors },
    actions: { onSubmit, register, handleSubmit },
  };
};
export default useLogin;

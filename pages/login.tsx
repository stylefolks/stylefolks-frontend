import { gql, useMutation } from '@apollo/client';
import Header from 'next/head';
import { useForm } from 'react-hook-form';
import { Button } from '../components/Button';
import { FormError } from '../components/FormError';
import { authTokenVar, isLoggedInVar } from '../lib/apolloClient';
import homeStyle from '../styles/Home.module.css';
import { login, loginVariables } from './__generated__/login';

interface ILoginForm {
  email: string;
  password: string;
}

export const LOGIN_MUTATION = gql`
  mutation login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

export const Login = () => {
  const onCompleted = (data: login) => {
    const {
      login: { error, ok, token },
    } = data;
    console.log('login Status', data);
    if (ok && token) {
      localStorage?.setItem('folks-token', token);
      authTokenVar(token);
      isLoggedInVar(true);
    } else {
      if (error) {
        console.error(error);
        alert('로그인 에러가 발생했습니다.');
      }
    }
  };

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    login,
    loginVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ILoginForm>({
    mode: 'onChange',
  });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      console.log('....??');
      loginMutation({
        variables: {
          loginInput: { email, password },
        },
      });
    }
  };

  return (
    <>
      <Header>The Folks | Login</Header>
      <section className={homeStyle.container}>
        <h4>Welcome Back!</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('email', {
              required: '이메일 양식에 맞춰 기입해주세요',
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            type="text"
            name="email"
            placeholder="Email"
          />
          {errors.email?.type === 'pattern' && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            {...register('password', {
              required: 'Password is required',
              // minLength: 10,
            })}
            name="password"
            type="password"
            required
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          <Button
            canClick={isValid}
            actionText="gel"
            loading={loading}
          ></Button>

          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
      </section>
    </>
  );
};

export default Login;

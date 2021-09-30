import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/Button';
import { FormError } from '../components/FormError';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { authTokenVar, isLoggedInVar } from '../lib/apolloClient';
import { login, loginVariables } from '../src/__generated__/login';
import LoginStyle from '../styles/Login.module.scss';
import UtilStyle from '../styles/Util.module.scss';
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
  const router = useRouter();
  const onCompleted = (data: login) => {
    const {
      login: { error, ok, token },
    } = data;
    console.log('login Status', data);
    if (ok && token) {
      localStorage?.setItem('folks-token', token);
      authTokenVar(token);
      isLoggedInVar(true);
      router.push('/');
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
  useEffect(() => {
    console.log(errors.email);
  }, [errors.email]);

  return (
    <>
      <title>The Folks | Login</title>
      <section>
        <h2>Welcome Back!</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={UtilStyle.form}>
          <div className={UtilStyle.inputWrapper}>
            <label htmlFor="email">Email</label>
            <input
              {...register('email', {
                required: 'Only eg?',
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              className={UtilStyle.input}
              type="text"
              name="email"
              placeholder="Email"
            />

            <div className={UtilStyle.errorFormWrapper}>
              {errors.email?.type === 'pattern' && (
                <FormError errorMessage={'이메일 양식을 맞춰주세요.'} />
              )}
            </div>
          </div>
          <div className={UtilStyle.inputWrapper}>
            <label htmlFor="password">Password</label>
            <input
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                // minLength: 10,
              })}
              name="password"
              type="password"
              required
              placeholder="Password"
              className={UtilStyle.input}
            />
            <div className={UtilStyle.errorFormWrapper}>
              {errors.password?.message && (
                <FormError errorMessage={errors.password?.message} />
              )}
            </div>
          </div>
          <Button
            canClick={isValid}
            actionText="SUBMIT"
            loading={loading}
          ></Button>
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div className={LoginStyle.divideWrapper}>
          <div />
          <span> OR </span>
          <div />
        </div>
        <GoogleLoginButton />
        <div className={LoginStyle.registerButtonWrapper}>
          <span>The Folks에 처음이신가요?</span>
          <Link href="/create-account">
            <a>회원가입 하러 가기</a>
          </Link>
        </div>
      </section>
      <style jsx>{`
        section {
          margin: 0;
          padding: 7vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        button {
          margin: 2rem 0;
        }
      `}</style>
    </>
  );
};

export default Login;

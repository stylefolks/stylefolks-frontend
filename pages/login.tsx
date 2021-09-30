import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Button } from '../components/Button';
import { FormError } from '../components/FormError';
import { authTokenVar, isLoggedInVar } from '../lib/apolloClient';
import { login, loginVariables } from '../src/__generated__/login';

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

  return (
    <>
      <title>The Folks | Login</title>
      <section>
        <h4>Welcome Back!</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputWrapper">
            <label htmlFor="email">Email</label>
            <input
              {...register('email', {
                required: '이메일 양식에 맞춰 기입해주세요',
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              className="input"
              type="text"
              name="email"
              placeholder="Email"
            />

            {errors.email?.type === 'pattern' && (
              <FormError errorMessage={errors.email?.message} />
            )}
          </div>
          <div className="inputWrapper">
            <label htmlFor="password">Password</label>
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

        form {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .inputWrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        label {
          margin: 0.6rem 0;
        }
        .input {
          padding: 0.1rem;
          padding-left: 0.55rem;
          font-size: 1.125rem;
          line-height: 1.75rem;
          font-weight: 300;
          height: calc(1.1em+ 2px);
        }

        .input:focus {
          --tw-border-opacity: 1;
          border-color: rgba(107, 114, 128, var(--tw-border-opacity));
        }

        button {
          margin: 2rem 0;
        }
      `}</style>
    </>
  );
};

export default Login;

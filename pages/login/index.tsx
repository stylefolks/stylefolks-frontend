import { Button } from 'components/common/button/Button';
import { FormError } from 'components/common/FormError';
import useLogin from 'hooks/pages/login/useLogin';
import Link from 'next/link';
import UtilStyle from 'styles/common/Util.module.scss';
import LoginStyle from 'styles/login/Login.module.scss';

export const Login = () => {
  const { state, actions } = useLogin();
  const { isValid, loading, loginMutationResult, errors } = state;
  const { onSubmit, register, handleSubmit } = actions;

  return (
    <>
      <title>The Folks | Login</title>
      <section className={LoginStyle.loginConatiner}>
        <h2>Welcome Back!</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={UtilStyle.form}>
          <div className={UtilStyle.inputWrapper}>
            <label htmlFor="email">Email</label>
            <input
              {...register('email', {
                required: '이메일을 입력해주세요',
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
              {errors.email?.message && (
                <FormError errorMessage={errors.email?.message} />
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
        {/* <GoogleLoginButton /> */}
        <div className={LoginStyle.registerButtonWrapper}>
          <Link href="/create-account">
            <a>회원가입</a>
          </Link>
        </div>
        <div className={LoginStyle.registerButtonWrapper}>
          <Link href="/find-password">
            <a>비밀번호 찾기</a>
          </Link>
        </div>
      </section>
      <style jsx>{`
        /* button {
          margin: 2rem 0;
        } */
      `}</style>
    </>
  );
};

export default Login;

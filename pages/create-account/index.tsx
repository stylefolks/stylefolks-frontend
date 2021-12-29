import { Button } from 'components/common/button/Button';
import { FormError } from 'components/common/FormError';
import useCreateAccount from 'hooks/pages/create-account/useCreateAccount';
import Link from 'next/link';
import React from 'react';
import UtilStyle from 'styles/common/Util.module.scss';
import LoginStyle from 'styles/login/Login.module.scss';

export const CreateAccount = () => {
  const { state, actions } = useCreateAccount();
  const { errors, isValid, loading, password, createAccountMuataionResult } =
    state;
  const { handleSubmit, onSubmit, register } = actions;

  return (
    <>
      <title>The Folks | Create-Account</title>
      <section>
        <h2>Create Your Own Account</h2>
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
          <div className={UtilStyle.inputWrapper}>
            <label htmlFor="checkPassword">Repeat password</label>
            <input
              {...register('checkPassword', {
                required: '비밀번호 확인을 위해 입력해주세요.',
                validate: (value) =>
                  value === password || 'The passwords do not match',
              })}
              name="checkPassword"
              type="password"
              required
              placeholder="Password Check"
              className={UtilStyle.input}
            />
            <div className={UtilStyle.errorFormWrapper}>
              {errors.checkPassword && (
                <FormError errorMessage="비밀번호를 확인해주세요" />
              )}
            </div>
          </div>

          <div className={UtilStyle.inputWrapper}>
            <label htmlFor="nickname">Nickname</label>
            <input
              {...register('nickname', {
                required: '닉네임을 입력해주세요',
              })}
              className={UtilStyle.input}
              type="text"
              name="nickname"
              placeholder="Nickname"
            />

            <div className={UtilStyle.errorFormWrapper}>
              {errors?.nickname?.message && (
                <FormError errorMessage={errors?.nickname?.message} />
              )}
            </div>
          </div>

          <Button
            canClick={isValid}
            actionText="Be Our Folks"
            loading={loading}
          ></Button>
          {createAccountMuataionResult?.createAccount.error && (
            <FormError
              errorMessage={createAccountMuataionResult?.createAccount.error}
            />
          )}
        </form>

        <div className={LoginStyle.registerButtonWrapper}>
          <span>이미 회원이신가요?</span>
          <Link href="/login">
            <a>로그인하러 가기</a>
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

export default CreateAccount;

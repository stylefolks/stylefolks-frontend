import { gql, useMutation } from '@apollo/client';
import { Button } from 'components/common/Button';
import { FormError } from 'components/FormError';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  createAccount,
  createAccountVariables,
} from '../src/__generated__/createAccount';
import { UserRole } from '../src/__generated__/globalTypes';
import LoginStyle from '../styles/Login.module.scss';
import UtilStyle from '../styles/Util.module.scss';

interface ICreateAccountForm {
  email: string;
  password: string;
  checkPassword: string;
  nickname: string;
}

//https://codesandbox.io/s/react-hook-form-password-match-check-standard-validation-eo6en?file=/src/index.js:974-982
export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

export const CreateAccount = () => {
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

  const onSubmit = () => {
    //role은 유저로 자동  넘어가는게 정상
    if (!loading) {
      createAccountMutation({
        variables: {
          createAccountInput: {
            email: email,
            password: password,
            nickname: nickname,
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
    }
  );

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

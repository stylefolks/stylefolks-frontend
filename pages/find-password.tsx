import { ApolloError, useMutation } from '@apollo/client';
import { Button } from 'components/common/button/Button';
import { FormError } from 'components/common/FormError';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  findPassword,
  findPasswordVariables,
} from 'src/__generated__/findPassword';
import UtilStyle from '../styles/common/Util.module.scss';

const FIND_PASSWORD = gql`
  mutation findPassword($input: FindPasswordIntput!) {
    findPassword(input: $input) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
}

const FindPassword = () => {
  const route = useRouter();
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ICreateAccountForm>({
    mode: 'onChange',
  });

  const onCompleted = (data: findPassword) => {
    if (data.findPassword.ok) {
      alert(`${getValues().email}로 임시 비밀번호가 전송되었습니다.`);
      route.push('/login');
    }

    if (data.findPassword.error) {
      alert(`${data.findPassword.error}`);
      route.reload();
    }
  };

  const onError = (error: ApolloError) => {
    alert(error.message);
    route.push('/');
  };

  const onSubmit = () => {
    findPasswordMutation({
      variables: { input: { email: getValues().email } },
    });
  };

  const [findPasswordMutation, { data, loading }] = useMutation<
    findPassword,
    findPasswordVariables
  >(FIND_PASSWORD, { onCompleted, onError });

  return (
    <>
      <title>The Folks | Find-Password</title>
      <section>
        <h2>Find Password With Your Email</h2>
        <form className={UtilStyle.form} onSubmit={handleSubmit(onSubmit)}>
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

          <Button
            canClick={!errors && isValid}
            actionText="임시 비밀번호 메일로 전송하기"
            loading={loading}
          ></Button>
          {data?.findPassword.error && (
            <FormError errorMessage={data?.findPassword.error} />
          )}
        </form>
      </section>
    </>
  );
};

export default FindPassword;

import { gql, useMutation, useQuery } from '@apollo/client';
import { Button } from 'components/common/button/Button';
import { FormError } from 'components/common/FormError';
import PageChange from 'components/pageChange/PageChange';
import { CAN_MAKE_CREW } from 'graphql/crew/queries';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { canMakeCrew } from 'src/__generated__/canMakeCrew';
import { createCrew, createCrewVariables } from 'src/__generated__/createCrew';
import UtilStyle from 'styles/common/Util.module.scss';
interface MakeCrewInformation {
  crewName: string;
  crewIntroduction: string;
}

const CREATE_CREW = gql`
  mutation createCrew($input: CreateCrewInput!) {
    createCrew(input: $input) {
      ok
      error
    }
  }
`;

const MakeCrew = () => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<MakeCrewInformation>({ mode: 'onChange' });

  const onError = (error: Error) => {
    alert(error);
  };

  const onCompleted = (data: createCrew) => {
    if (data?.createCrew.ok) {
      const { crewName } = getValues();
      route.push(`/crew/${crewName}`);
    }

    if (!data?.createCrew.ok || data?.createCrew.error) {
      alert(data?.createCrew.error);
    }
  };
  const [createCrew, { error: createCrewError }] = useMutation<
    createCrew,
    createCrewVariables
  >(CREATE_CREW, {
    onCompleted,
    onError,
  });

  const onSubmit = () => {
    const { crewName: name, crewIntroduction: introduction } = getValues();
    createCrew({
      variables: {
        input: {
          name,
          introduction,
        },
      },
    });
    // console.log(crewName, crewIntroduction);
  };

  const {
    data: canMakeData,
    loading: canMakeLoading,
    error: canMakeError,
  } = useQuery<canMakeCrew>(CAN_MAKE_CREW);
  const route = useRouter();

  useEffect(() => {
    console.log(canMakeData?.canMakeCrew.ok);
    // if (!canMakeData?.canMakeCrew.ok) {
    //   route.push('/');
    //   return;
    // }
  }, []);

  if (canMakeLoading) {
    return <PageChange />;
  }

  return (
    <div>
      <h1>Make Crew</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={UtilStyle.form}>
        <div className={UtilStyle.inputWrapper}>
          <label htmlFor="crewName">Name</label>
          <input
            {...register('crewName', {
              required: '크루명을 입력해주세요.',
              minLength: 4,
              pattern: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/gi,
            })}
            name="crewName"
          />

          {errors.crewName?.type === 'pattern' && (
            <FormError
              errorMessage={'크루명은 한글, 영어, 숫자만 가능합니다.'}
            />
          )}
          {errors.crewName?.message && (
            <FormError errorMessage={errors.crewName?.message} />
          )}
          {errors.crewName?.type === 'minLength' && (
            <FormError errorMessage={'4자 이상 입력해주세요.'} />
          )}
          <label>Introduction</label>
          <input
            {...register('crewIntroduction', {
              required: '크루 소개를 입력해주세요',
              minLength: 4,
            })}
            name="crewIntroduction"
          />

          {errors.crewIntroduction?.message && (
            <FormError errorMessage={errors.crewName?.message} />
          )}
          {errors.crewIntroduction?.type === 'minLength' && (
            <FormError errorMessage={'소개글을 4자 이상 입력해주세요.'} />
          )}

          {createCrewError?.message && (
            <FormError errorMessage={createCrewError.message} />
          )}

          <Button
            actionText={isValid ? '크루 만들기' : '입력값을 확인 해주세요.'}
            loading={false}
            canClick
          />
          <Button
            actionText="나가기"
            onClick={() => route.push('/')}
            loading={false}
            canClick
          />
        </div>
      </form>
    </div>
  );
};

export default MakeCrew;

import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  verifyEmail,
  verifyEmailVariables,
} from '../src/__generated__/verifyEmail';

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

const Confirm: React.FC = () => {
  const onCompleted = (data: verifyEmail) => {
    console.log(data);
    if (data.verifyEmail.ok) {
      router.push('/login');
    }
    if (data.verifyEmail.error) {
      alert(
        `${data.verifyEmail.error}. \n이미 인증이 되었는지 확인해주세요. \n문제가 지속되면 관리자에게 문의해주세요 :)`
      );
      return router.push('/login');
    }
  };

  const [verifyEmailMutation, { data, loading }] = useMutation<
    verifyEmail,
    verifyEmailVariables
  >(VERIFY_EMAIL_MUTATION, { onCompleted });

  const router = useRouter();
  const { code } = router.query;
  console.log(router.query.code);

  useEffect(() => {
    if (router.query.code) {
      console.log('code', code);
      verifyEmailMutation({
        variables: {
          input: { code: router.query.code as string },
        },
      });
    }
  }, [code]);

  // /confirm?code=1245982d-8f2c-44b6-9f05-c205e392c460
  // /post/abc?foo=bar
  return (
    <div>
      {loading ? 'Wait For Confirming You!' : 'Verify DONE!'}
      <h1>{router.query.code}</h1>
    </div>
  );
};

export default Confirm;

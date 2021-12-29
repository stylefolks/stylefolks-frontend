import { useMutation } from '@apollo/client';
import { VERIFY_EMAIL_MUTATION } from 'graphql/user/mutations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  verifyEmail,
  verifyEmailVariables,
} from 'src/__generated__/verifyEmail';

const Confirm: React.FC = () => {
  const onCompleted = (data: verifyEmail) => {
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

  useEffect(() => {
    if (router.query.code && typeof router.query.code === 'string') {
      verifyEmailMutation({
        variables: {
          input: { code: router.query.code },
        },
      });
    } else {
      alert('Code have problems \n Please ask to manager');
    }
  }, [code]);

  return (
    <div>
      <title>The Folks | Confirm</title>
      {loading ? 'Wait For Confirming You!' : 'Verify DONE!'}
      <h1>{router.query.code}</h1>
    </div>
  );
};

export default Confirm;

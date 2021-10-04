import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ME_QUERY } from '../graphql/queries';
import { authTokenVar, isLoggedInVar } from '../lib/apolloClient';
import { UserRole } from '../src/__generated__/globalTypes';
import { upadateUser } from '../store/modules/userReducer';

const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const client = useApolloClient();

  useEffect(() => {
    localStorage.removeItem('folks-token');
    isLoggedInVar(false);
    dispatch(upadateUser({ email: '', id: '', role: UserRole.User }));
    authTokenVar('');

    const queryResult = client.readQuery({ query: ME_QUERY });
    console.log('@@@@@@ Logout Router', queryResult);

    if (queryResult && queryResult.me && queryResult.me.id) {
      client.writeQuery({
        query: ME_QUERY,
        data: {
          me: {
            email: '',
            id: 0,
            link: null,
            nickname: '',
            profileImg: '',
            verified: false,
            ...queryResult,
          },
        },
      });
    }
    router.push('/login');
  }, []);

  return <div></div>;
};
export default Logout;

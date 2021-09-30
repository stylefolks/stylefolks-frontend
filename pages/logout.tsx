import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isLoggedInVar } from '../lib/apolloClient';

const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    isLoggedInVar(false);
    localStorage.removeItem('folks-token');
    router.push('/login');
  }, []);
  return <div></div>;
};
export default Logout;

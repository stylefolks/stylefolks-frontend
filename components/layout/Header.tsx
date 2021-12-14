import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { isLoggedInVar, userInfoVar } from 'cache/common/common.cache';
import BurgerButton from 'components/common/button/BurgerButton';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UtilStyle from 'styles/common/Util.module.scss';
import GNBStyle from 'styles/GNB.module.scss';
import ProfileStyle from 'styles/Profile.module.scss';
import { ME_QUERY } from '../../graphql/queries';
import { meQuery } from '../../src/__generated__/meQuery';
import Nav from './Nav';

const DynamicProfile = dynamic(() => import('../Profile'), {
  ssr: false,
});

//https://stackoverflow.com/questions/66499705/how-would-i-update-the-authorization-header-from-a-cookie-on-a-graphql-apollo-mu
export const Header = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const onCompleted = (data: meQuery) => {
    if (data?.me) {
      const { verified, __typename, id, ...input } = data?.me;
      userInfoVar({ id, ...input });
    }
  };

  const [getMeInfo, { refetch, data, error, loading }] = useLazyQuery<meQuery>(
    ME_QUERY,
    {
      context: {
        headers: {
          'folks-token':
            typeof window !== 'undefined'
              ? localStorage.getItem('folks-token')
              : '',
        },
      },
      nextFetchPolicy: 'network-only',
      fetchPolicy: 'network-only',
      onCompleted,
    }
  );

  const onClick = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isVisible) {
      setIsVisible((prev) => !prev);
    }
  }, [router.pathname]);

  useEffect(() => {
    isLoggedIn && getMeInfo();
  }, [isLoggedIn]);

  return (
    <>
      <div className={GNBStyle.headerContainer}>
        <BurgerButton onClick={onClick} />
        <header
          onClick={() => router.push('/')}
          className={`${UtilStyle.flexColumnCenter} ${UtilStyle.clickable}`}
        >
          <h1>The Folks</h1>
          <h4>The Advanced Fashion Community</h4>
        </header>
        {isLoggedIn ? (
          <DynamicProfile />
        ) : (
          <button
            onClick={() => router.push('/login')}
            className={ProfileStyle.loginText}
          >
            Login
          </button>
        )}
      </div>
      <Nav onClick={onClick} isVisible={isVisible} />
    </>
  );
};

export default Header;

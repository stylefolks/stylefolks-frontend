import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ME_QUERY } from '../graphql/queries';
import { isLoggedInVar } from '../lib/apolloClient';
import { meQuery } from '../src/__generated__/meQuery';
import GNBStyle from '../styles/GNB.module.scss';
import ProfileStyle from '../styles/Profile.module.scss';
import UtilStyle from '../styles/Util.module.scss';
import BurgerButton from './BurgerButton';
import Nav from './Nav';
import Profile from './Profile';

export const Header = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [getMeInfo, { data, error, loading }] = useLazyQuery<meQuery>(
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
    }
  );
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const onClick = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isVisible) {
      setIsVisible((prev) => !prev);
    }
  }, [router.pathname]);

  useEffect(() => {
    getMeInfo();
  }, [isLoggedIn]);

  return (
    <>
      <header className={GNBStyle.headerContainer}>
        <BurgerButton onClick={onClick} />
        <div
          onClick={() => router.push('/')}
          className={`${UtilStyle.flexColumnCenter} ${UtilStyle.clickable}`}
        >
          <h1>The Folks</h1>
          <h4>The Advanced Fashion Community</h4>
        </div>
        {isLoggedIn ? (
          <Profile
            profileImg={data?.me.profileImg}
            id={data?.me.id}
            nickname={data?.me.nickname}
          />
        ) : (
          <button
            onClick={() => router.push('/login')}
            className={ProfileStyle.loginText}
          >
            Login
          </button>
        )}
      </header>
      <Nav onClick={onClick} isVisible={isVisible} />
    </>
  );
};

export default Header;

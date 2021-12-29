import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar, userInfoVar } from 'cache/common/common.cache';
import BurgerButton from 'components/common/button/BurgerButton';
import Profile from 'components/user/Profile';
import { useLazyMe } from 'hooks/common/useMe';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import GNBStyle from 'styles/common/GNB.module.scss';
import UtilStyle from 'styles/common/Util.module.scss';
import ProfileStyle from 'styles/user/Profile.module.scss';
import Nav from './Nav';

//https://stackoverflow.com/questions/66499705/how-would-i-update-the-authorization-header-from-a-cookie-on-a-graphql-apollo-mu
export const Header = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const user = useReactiveVar(userInfoVar);
  const [getMeInfo] = useLazyMe();

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
          <Profile user={user} />
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

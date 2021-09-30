import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useMe } from '../hooks/useMe';
import { isLoggedInVar, userInfoVar } from '../lib/apolloClient';

const Nav = () => {
  const { pathname } = useRouter();
  const [queryReadyToStart, { data, loading, error }] = useMe();
  useEffect(() => {
    queryReadyToStart();
    if (!loading && data?.me.email) {
      isLoggedInVar(true);
      userInfoVar({
        email: data.me.email,
        id: data.me.id,
        role: data.me.role,
      });
    }
    if (error) {
      isLoggedInVar(false);
    }
    //verified는 이메일 인증 안된것으로 나중에 위에 배너띄워주던지 해보자 ..
  }, []);

  return (
    <nav>
      <Link href="/">
        <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
      </Link>
      <Link href="/about/about">
        <a className={pathname === '/about/about' ? 'is-active' : ''}>
          |About About|
        </a>
      </Link>
      {isLoggedInVar() ? (
        // <button onClick={doLogOut}>Log out</button>
        <Link href="/logout">
          <a>{loading ? 'Loading...' : 'Logout'}</a>
        </Link>
      ) : (
        <Link href="/login">
          <a className={pathname === '/login' ? 'is-active' : ''}>
            {loading ? 'Loading...' : 'Login'}
          </a>
        </Link>
      )}

      <Link href="/about">
        <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
      </Link>
      <Link href="/client-only">
        <a className={pathname === '/client-only' ? 'is-active' : ''}>
          Client-Only
        </a>
      </Link>
      <Link href="/ssr">
        <a className={pathname === '/ssr' ? 'is-active' : ''}>SSR</a>
      </Link>
      <style jsx>{`
        a {
          font-size: 14px;
          margin-right: 15px;
          text-decoration: none;
        }
        .is-active {
          text-decoration: underline;
        }
      `}</style>
    </nav>
  );
};

export default Nav;

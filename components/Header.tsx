import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMe } from '../hooks/useMe';
import { authTokenVar, isLoggedInVar } from '../lib/apolloClient';

export default function Header() {
  const { pathname } = useRouter();
  const [queryReadyToStart, { data, loading, error }] = useMe();

  console.log('In Header', authTokenVar(), data, loading, error);

  useEffect(() => {
    queryReadyToStart();
    if (!loading && data?.me.verified) {
      isLoggedInVar(true);
    }
  }, []);

  return (
    <header>
      <Link href="/">
        <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
      </Link>
      <Link href="/about/about">
        <a className={pathname === '/about' ? 'is-active' : ''}>
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
          <a className={pathname === '/about' ? 'is-active' : ''}>
            <a>{loading ? 'Loading...' : 'Login'}</a>
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
        header {
          margin-bottom: 25px;
        }
        a {
          font-size: 14px;
          margin-right: 15px;
          text-decoration: none;
        }
        .is-active {
          text-decoration: underline;
        }
      `}</style>
    </header>
  );
}

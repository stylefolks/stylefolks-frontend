import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const { pathname } = useRouter();

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
      <Link href="/login">
        <a className={pathname === '/about' ? 'is-active' : ''}>|Login|</a>
      </Link>
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

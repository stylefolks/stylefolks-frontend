import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import GNBStyle from '../styles/GNB.module.scss';
import UtilStyle from '../styles/Util.module.scss';
interface IProps {
  loading: boolean;
}
interface INavMap {
  name: string;
  pathname: string;
}

const NAV_MAP: INavMap[] = [
  { name: 'Home', pathname: '/' },
  { name: 'Talk', pathname: '/talk' },
  { name: 'Column', pathname: '/column' },
  { name: 'Folks', pathname: '/folks' },
];

const Nav: React.FC<IProps> = ({ loading }) => {
  const { pathname } = useRouter();

  return (
    <nav className={`${UtilStyle.flexSpaceBetween} ${GNBStyle.navConatiner}`}>
      {NAV_MAP.map((el) => (
        <Link href={el.pathname} key={el.name}>
          <a className={pathname === el.pathname ? 'is-active' : ''}>
            {el.name}
          </a>
        </Link>
      ))}

      <style jsx>{`
        .is-active {
          text-decoration: underline;
        }
      `}</style>
    </nav>
  );
};

export default Nav;

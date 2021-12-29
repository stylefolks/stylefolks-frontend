import QuitButton from 'components/common/button/QuitButton';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import GNBStyle from 'styles/common/GNB.module.scss';
interface IProps {
  onClick: () => void;
  isVisible: boolean;
}
interface INavMap {
  name: string;
  pathname: string;
}

const NAV_MAP: INavMap[] = [
  { name: 'Home', pathname: '/' },
  { name: 'Talk', pathname: '/talk' },
  { name: 'Crew', pathname: '/crew' },
  { name: 'Column', pathname: '/column' },
  // { name: 'Folks', pathname: '/folks' },
];

const Nav: React.FC<IProps> = ({ onClick, isVisible }) => {
  const { pathname } = useRouter();

  useEffect(() => {
    isVisible && (document.body.style.overflow = 'hidden');
    !isVisible && (document.body.style.overflow = 'unset');
  }, [isVisible]);

  return (
    <nav
      className={
        isVisible
          ? `${GNBStyle.navContainer} ${GNBStyle.visible}`
          : `${GNBStyle.navContainer} ${GNBStyle.invisible}`
      }
    >
      {NAV_MAP.map((el) => (
        <Link href={el.pathname} key={el.name}>
          <a className={pathname === el.pathname ? `${GNBStyle.isActive}` : ''}>
            {el.name}
          </a>
        </Link>
      ))}

      <QuitButton onClick={onClick} />
    </nav>
  );
};

export default Nav;

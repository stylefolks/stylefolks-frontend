import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMe } from '../hooks/useMe';
import { isLoggedInVar, userInfoVar } from '../lib/apolloClient';
import GNBStyle from '../styles/GNB.module.scss';
import UtilStyle from '../styles/Util.module.scss';
import BurgerButton from './BurgerButton';
import Nav from './Nav';
import Profile from './Profile';

export default function Header() {
  const router = useRouter();
  const [queryReadyToStart, { data, loading, error }] = useMe();
  const [isSmall, setIsSmall] = useState<boolean>(false);

  const handleResize = () => {
    if (window.innerWidth > 1100) {
      return setIsSmall(false);
    }
    return setIsSmall(true);
  };

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

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    //verified는 이메일 인증 안된것으로 나중에 위에 배너띄워주던지 해보자 ..
  }, []);

  return (
    <>
      <header className={GNBStyle.headerContainer}>
        <div
          onClick={() => router.push('/')}
          className={`${UtilStyle.flexColumnCenter} ${UtilStyle.clickable}`}
        >
          <h1>The Folks</h1>
          <h4>The Advanced Fashion Community</h4>
        </div>
        {isLoggedInVar() === true && !isSmall ? (
          <Profile
            email={data?.me.email}
            id={data?.me.id}
            nickname={data?.me.nickname}
            profileImage={data?.me.profileImage}
            role={data?.me.role}
          />
        ) : (
          ''
        )}
        {isSmall && <BurgerButton />}
        <style jsx>{`
 */
        `}</style>
      </header>
      <Nav loading={loading} />
    </>
  );
}

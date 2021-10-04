import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMe } from '../hooks/useMe';
import { isLoggedInVar } from '../lib/apolloClient';
import { upadateUser } from '../store/modules/userReducer';
import GNBStyle from '../styles/GNB.module.scss';
import UtilStyle from '../styles/Util.module.scss';
import BurgerButton from './BurgerButton';
import Nav from './Nav';
import Profile from './Profile';

export default function Header() {
  const router = useRouter();
  const { data, loading, error } = useMe();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && data?.me.email) {
      isLoggedInVar(true);
      dispatch(
        upadateUser({
          email: data.me.email,
          id: data.me.id.toString(),
          role: data.me.role,
        })
      );
    }
    if (error) {
      isLoggedInVar(false);
    }
  }, []);

  const onClick = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isVisible) {
      setIsVisible((prev) => !prev);
    }
  }, [router.pathname]);

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

        <Profile
          id={data?.me.id}
          profileImage={data?.me.profileImg}
          nickname={data?.me.nickname}
        />

        <style jsx>{`
 */
        `}</style>
      </header>
      <Nav onClick={onClick} isVisible={isVisible} />
    </>
  );
}

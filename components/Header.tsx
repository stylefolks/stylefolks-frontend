import { useLazyQuery, useReactiveVar } from '@apollo/client';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { upadateUser } from 'store/modules/userReducer';
import { ME_QUERY } from '../graphql/queries';
import { isLoggedInVar } from '../lib/apolloClient';
import { meQuery } from '../src/__generated__/meQuery';
import GNBStyle from '../styles/GNB.module.scss';
import ProfileStyle from '../styles/Profile.module.scss';
import UtilStyle from '../styles/Util.module.scss';
import BurgerButton from './common/BurgerButton';
import Nav from './Nav';

const DynamicProfile = dynamic(() => import('./Profile'), {
  ssr: false,
});

//https://stackoverflow.com/questions/66499705/how-would-i-update-the-authorization-header-from-a-cookie-on-a-graphql-apollo-mu
export const Header = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const onCompleted = (data: meQuery) => {
    const { verified, link, __typename, id, ...input } = data?.me;

    dispatch(upadateUser({ id: id + '', ...input }));
  };

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
      onCompleted,
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
          <DynamicProfile
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
      </div>
      <Nav onClick={onClick} isVisible={isVisible} />
    </>
  );
};

export default Header;

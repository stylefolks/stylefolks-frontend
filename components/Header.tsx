import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMe } from '../hooks/useMe';
import { isLoggedInVar, userInfoVar } from '../lib/apolloClient';
import Nav from './Nav';

export default function Header() {
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
    <>
      <header>
        <h1>The Folks</h1>
        <h4>Combined Fashion Community</h4>

        <span>{isLoggedInVar() ? data?.me.role : ''}</span>
        <style jsx>{`
          header {
            height: 100px;
            margin-bottom: 25px;
            background-color: white;
            border-bottom: 1px solid #efeff0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          h1 {
            font-size: min(7vw, 36px);
          }
          h4 {
            font-size: 1vw;
            margin: 0;
          }
        `}</style>
      </header>
      <Nav />
    </>
  );
}

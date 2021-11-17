import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Post = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);

  return <div>존재하지 않는 게시물 입니다 ..</div>;
};

export default Post;

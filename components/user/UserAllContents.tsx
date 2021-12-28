import { useQuery } from '@apollo/client';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageChange from 'components/pageChange/PageChange';
import { format } from 'date-fns';
import { GET_USER_ALL_POST } from 'graphql/post/queries';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import whiteImage from 'public/vacantImage.png';
import {
  getUserPost,
  getUserPostVariables,
} from 'src/__generated__/getUserPost';
import UserStyle from 'styles/User.module.scss';

interface IPropsUserAllContents {
  nickname: string;
}

const UserAllContents: React.FC<IPropsUserAllContents> = ({ nickname }) => {
  const router = useRouter();
  const { data, loading, error } = useQuery<getUserPost, getUserPostVariables>(
    GET_USER_ALL_POST,
    {
      variables: {
        nickname,
      },
    }
  );

  if (loading) return <PageChange />;

  return (
    <section>
      <h2>Story Count:{data?.getUserPost?.posts?.length}</h2>
      <ul>
        {data?.getUserPost?.posts.map((el) => (
          <li key={el.id} className={UserStyle.userAllEachContents}>
            <Link href={`/post/${el.id}`}>
              <a>
                <div>
                  <div onClick={() => router.push(`/post/${el.id}`)}>
                    <Image
                      src={el?.titleImg ? el.titleImg : whiteImage}
                      alt="titleimage"
                      width="60px"
                      height="60px"
                      blurDataURL={el.titleImg}
                      placeholder="blur"
                    />
                  </div>
                  <div className={UserStyle.userAllEachContentsTitle}>
                    <span>{format(new Date(el.createdAt), 'yyyy-MM-dd')}</span>
                    <span>TITLE : {el.title}</span>
                    <span>
                      <FontAwesomeIcon icon={faUser} /> {el.viewCount}
                    </span>
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default UserAllContents;

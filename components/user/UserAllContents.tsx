import { useQuery } from '@apollo/client';
import PageChange from 'components/pageChange/PageChange';
import TalkColumn from 'components/talk/TalkColumn';
import { GET_USER_ALL_POST } from 'graphql/post/queries';
import {
  getUserPost,
  getUserPostVariables,
} from 'src/__generated__/getUserPost';

interface IPropsUserAllContents {
  nickname: string;
}

const UserAllContents: React.FC<IPropsUserAllContents> = ({ nickname }) => {
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
        {data?.getUserPost?.posts.map((el) => {
          const { id, title, titleImg, viewCount, contents, createdAt } = el;

          return (
            <TalkColumn
              key={id}
              id={id}
              title={title}
              titleImg={titleImg}
              viewCount={viewCount}
              contents={contents}
              createdAt={createdAt}
              nickname={nickname}
            />
          );
        })}
      </ul>
    </section>
  );
};
export default UserAllContents;

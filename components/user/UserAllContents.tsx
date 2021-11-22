import { useMutation, useQuery } from '@apollo/client';
import { Button } from 'components/common/Button';
import { format } from 'date-fns';
import { DELETE_POST } from 'graphql/mutations';
import { GET_USER_ALL_POST } from 'graphql/queries';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import whiteImage from 'public/vacantImage.png';
import {
  deleteMyPost,
  deleteMyPostVariables,
} from 'src/__generated__/deleteMyPost';
import { findByNickName_findByNickName_user } from 'src/__generated__/findByNickName';
import {
  getUserPost,
  getUserPostVariables,
} from 'src/__generated__/getUserPost';
import UserStyle from 'styles/User.module.scss';

interface IPropsUserAllContents {
  pageUserData: findByNickName_findByNickName_user;
}

const UserAllContents: React.FC<IPropsUserAllContents> = ({ pageUserData }) => {
  const router = useRouter();
  const { data, loading, error } = useQuery<getUserPost, getUserPostVariables>(
    GET_USER_ALL_POST,
    {
      variables: {
        userId: pageUserData.id,
      },
    }
  );

  const onCompleted = (data: deleteMyPost) => {
    if (data.deleteMyPost.ok) {
      router.reload();
    }
  };

  const [
    deletePostMutation,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useMutation<deleteMyPost, deleteMyPostVariables>(DELETE_POST, {
    onCompleted,
  });

  const onDelete = (postId: number) => {
    deletePostMutation({
      variables: {
        postId,
      },
    });
  };

  return (
    <section>
      <h2>Story Count:{data?.getUserPost?.posts?.length}</h2>
      <ul>
        {data?.getUserPost?.posts.map((el) => (
          <li key={el.id} className={UserStyle.userAllEachContents}>
            <div>
              <div onClick={() => router.push(`/post/${el.id}`)}>
                <Image
                  src={el?.titleImg ? el.titleImg : whiteImage}
                  alt="titleimage"
                  width="60px"
                  height="60px"
                  unoptimized={true}
                />
              </div>
              <div className={UserStyle.userAllEachContentsTitle}>
                <span>
                  DATE : {format(new Date(el.createdAt), 'yyyy-MM-dd')}
                </span>
                <Link href={`/post/${el.id}`}>
                  <a>TITLE : {el.title}</a>
                </Link>
                <span>VIEWER : {el.viewCount}</span>
              </div>
            </div>
            <div className={UserStyle.userAllEachContentsButtons}>
              <Button
                actionText="수정"
                onClick={() => router.push(`/post/${el.id}`)}
                canClick={true}
                loading={false}
              />
              <Button
                actionText="삭제"
                onClick={() => onDelete(el.id)}
                canClick={true}
                loading={deleteLoading}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default UserAllContents;

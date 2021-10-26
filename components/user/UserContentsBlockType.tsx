import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { getPostByCategory } from 'src/__generated__/getPostByCategory';
import UserStyle from 'styles/User.module.scss';

interface IUserContentsBlockTypeProps {
  data: getPostByCategory;
}

const UserContentsBlockType: React.FC<IUserContentsBlockTypeProps> = ({
  data,
}) => {
  if (!data?.getPostByCategory.post.length)
    return <div className={UserStyle.noStory}>No Story Yet 😭</div>;

  return (
    <>
      {data?.getPostByCategory?.post.map((el) => (
        <li key={el.id}>
          <Link href={`/post/${el.id}`}>
            <a>
              <Image
                src={el?.titleImg}
                layout={'fill'}
                alt="contents"
                placeholder="blur"
                blurDataURL={el?.titleImg}
              />
              <div className={UserStyle.hiddenContentsTitle}>
                {el.title}
                <span>
                  <FontAwesomeIcon icon={faCheck} /> {el.viewCount}
                </span>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </>
  );
};

export default UserContentsBlockType;

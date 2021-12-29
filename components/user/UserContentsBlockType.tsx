import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import VacantImage from 'public/vacantImage.png';
import { getPostByCategory } from 'src/__generated__/getPostByCategory';
import UserStyle from 'styles/user/User.module.scss';
interface IUserContentsBlockTypeProps {
  data: getPostByCategory;
}

const UserContentsBlockType: React.FC<IUserContentsBlockTypeProps> = ({
  data,
}) => {
  if (!data?.getPostByCategory?.post?.length)
    return <div className={UserStyle.noStory}>No Story Yet 😭</div>;

  return (
    <>
      {data?.getPostByCategory?.post.map((el) => (
        <li key={el.id}>
          <Link href={`/post/${el.id}`}>
            <a>
              <div>
                <Image
                  alt={el.title}
                  src={el?.titleImg ? el.titleImg : VacantImage}
                  layout={'responsive'}
                  width={512}
                  height={512}
                  objectFit="cover"
                  objectPosition="center"
                  placeholder="blur"
                  blurDataURL={el?.titleImg}
                />
              </div>
              <div>
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

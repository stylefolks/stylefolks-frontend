import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { getPostByCategory } from 'src/__generated__/getPostByCategory';
import UserStyle from 'styles/User.module.scss';
import UserContentsBlockTypeStyle from 'styles/user/component/UserContentsBlockType.module.scss';

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
        <li
          key={el.id}
          className={UserContentsBlockTypeStyle.userContentsEachBlock}
        >
          <Link href={`/post/${el.id}`}>
            <a>
              <div>
                <Image
                  src={el?.titleImg}
                  layout={'responsive'}
                  width={'21vw'}
                  height={'21vw'}
                  alt="contents"
                  //blur적용시 에러메시지 발생 이유 찾아봐야할듯 다른곳은 안그런데 흠 ..
                  // placeholder="blur"
                  // blurDataURL={el?.titleImg}
                />
              </div>
              <div className={UserContentsBlockTypeStyle.hiddenContentsTitle}>
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

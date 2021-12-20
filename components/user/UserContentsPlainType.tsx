import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import UseWindowDimension from 'hooks/useWindowDimension';
import Link from 'next/link';
import { getPostByCategory } from 'src/__generated__/getPostByCategory';
import UserStyle from 'styles/User.module.scss';
import UserContentsPlaintTypeStyle from 'styles/user/component/UserContentsPlainType.module.scss';
import { makePreContents } from 'utils/Utils';

interface IUserContentsPlainTypeProps {
  data: getPostByCategory;
}

const UserContentsPlainType: React.FC<IUserContentsPlainTypeProps> = ({
  data,
}) => {
  const { width, height } = UseWindowDimension();

  if (!data?.getPostByCategory?.post?.length)
    return <div className={UserStyle.noStory}>No Story Yet 😭</div>;

  return (
    <>
      {data?.getPostByCategory?.post?.map((el) => (
        <li key={el.id}>
          <Link href={`/post/${el.id}`}>
            <a>
              <div className={UserContentsPlaintTypeStyle.titleWrapper}>
                <h2>TITLE : {el.title}</h2>
                <div>
                  <span>
                    <FontAwesomeIcon icon={faUser} /> {el.viewCount}
                  </span>
                  <span>
                    DATE : {format(new Date(el.createdAt), 'yyyy-MM-dd')}
                  </span>
                </div>
              </div>
              <div>
                <span className={UserContentsPlaintTypeStyle.plainContent}>
                  {makePreContents(el.contents)}
                </span>
                {/* {width >= 1024 ? (
                  <div className={UserContentsPlaintTypeStyle.contentBlinder}>
                    <EditorViewer content={el.contents} />
                  </div>
                ) : (

                )} */}
              </div>
            </a>
          </Link>
        </li>
      ))}
    </>
  );
};

export default UserContentsPlainType;

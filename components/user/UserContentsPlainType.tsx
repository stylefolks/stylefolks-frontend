import { format } from 'date-fns';
import UseWindowDimension from 'hooks/useWindowDimension';
import Link from 'next/link';
import { getPostByCategory } from 'src/__generated__/getPostByCategory';
import UserStyle from 'styles/User.module.scss';
import UserContentsPlaintTypeStyle from 'styles/user/component/UserContentsPlainType.module.scss';
import { makePreContents } from 'utils/Utils';
import EditorViewer from '../../components/upload/EditorViewer';

interface IUserContentsPlainTypeProps {
  data: getPostByCategory;
}

const UserContentsPlainType: React.FC<IUserContentsPlainTypeProps> = ({
  data,
}) => {
  const { width, height } = UseWindowDimension();

  if (!data?.getPostByCategory.post.length)
    return <div className={UserStyle.noStory}>No Story Yet 😭</div>;

  return (
    <>
      {data?.getPostByCategory.post.map((el) => (
        <li key={el.id}>
          <Link href={`/post/${el.id}`}>
            <a>
              <div>
                <h2>TITLE : {el.title}</h2>
                <div>
                  <span>VIEWER : {el.viewCount}</span>
                  <span>
                    DATE : {format(new Date(el.createdAt), 'yyyy-MM-dd')}
                  </span>
                </div>
              </div>
              <div>
                {width >= 1024 ? (
                  <div className={UserContentsPlaintTypeStyle.contentBlinder}>
                    <EditorViewer content={el.contents} />
                  </div>
                ) : (
                  <span>{makePreContents(el.contents)}</span>
                )}
              </div>
            </a>
          </Link>
        </li>
      ))}
    </>
  );
};

export default UserContentsPlainType;

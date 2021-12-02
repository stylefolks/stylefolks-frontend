import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import VacantImage from 'public/vacantImage.png';
import { getPostByCategory_getPostByCategory_post } from 'src/__generated__/getPostByCategory';
import ColumnStyle from 'styles/column/ColumnPage.module.scss';
import UtilStyle from 'styles/common/Util.module.scss';
import { makePreContents } from 'utils/Utils';

interface IColumnCard {
  data: getPostByCategory_getPostByCategory_post;
}

const ColumnCard: React.FC<IColumnCard> = ({ data }) => {
  return (
    <li className={ColumnStyle.cardWrapper}>
      <Link href={`post/${data.id}`}>
        <a>
          <div className={UtilStyle.imageSquareContainer}>
            <Image
              alt={data.title}
              src={data.titleImg || VacantImage}
              layout="fill"
            />
          </div>

          <div className={ColumnStyle.cardTextWrapper}>
            <div className={ColumnStyle.cardTitleWrapper}>
              <h2>{data.title}</h2>
              <h4>{data.user.nickname}</h4>
            </div>
            <span>{makePreContents(data.contents).slice(0, 100)}</span>
            <div>
              <FontAwesomeIcon icon={faUsers} /> {data.viewCount}
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default ColumnCard;

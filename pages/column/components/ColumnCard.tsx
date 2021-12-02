import { faFigma } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { getPostByCategory_getPostByCategory_post } from 'src/__generated__/getPostByCategory';
import ColumnStyle from 'styles/column/ColumnPage.module.scss';
interface IColumnCard {
  data: getPostByCategory_getPostByCategory_post;
}

const ColumnCard: React.FC<IColumnCard> = ({ data }) => {
  return (
    <li className={ColumnStyle.cardWrapper}>
      <Link href="">
        <a>
          <div>
            <div>
              {data.id}
              <h2>TITLE {data.title}</h2>
              <h4>Author{data.user.nickname}</h4>
            </div>
            <span>Contents</span>
            <div>
              <FontAwesomeIcon icon={faFigma} /> number: {data.viewCount}
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default ColumnCard;

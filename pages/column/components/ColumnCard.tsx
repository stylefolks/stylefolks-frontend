import { faFigma } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { getPostByCategory_getPostByCategory_post } from 'src/__generated__/getPostByCategory';

interface IColumnCard {
  data: getPostByCategory_getPostByCategory_post;
}

const ColumnCard: React.FC<IColumnCard> = () => {
  return (
    <li>
      <Link href="">
        <a>
          <div>
            <div>
              <h2>TITLE</h2>
              <h4>Author</h4>
            </div>
            <span>Contents</span>
            <div>
              <FontAwesomeIcon icon={faFigma} /> number
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default ColumnCard;

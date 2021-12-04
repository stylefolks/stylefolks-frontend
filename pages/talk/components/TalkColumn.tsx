import { faCheckCircle, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import VacantImage from 'public/vacantImage.png';
import React from 'react';
import { getPostByCategory_getPostByCategory_post } from 'src/__generated__/getPostByCategory';
import UtilStyle from 'styles/common/Util.module.scss';
import TalkStyle from 'styles/talk/TalkPage.module.scss';
import { makePreContents } from 'utils/Utils';

interface IProps {
  data: getPostByCategory_getPostByCategory_post;
}

const TalkColumn: React.FC<IProps> = ({ data }) => {
  return (
    <li className={TalkStyle.cardWrapper}>
      <Link href={`post/${data.id}`}>
        <a>
          <div className={TalkStyle.cardContentsContainer}>
            <h3>{data.title}</h3>
            <span className={TalkStyle.cardContentsWrapper}>
              {makePreContents(data.contents).slice(0, 100)}
            </span>
            <div className={TalkStyle.cardConfigWrapper}>
              <span>{data.user.nickname}</span>
              <span>{format(new Date(data.createdAt), 'yyyy-MM-dd')}</span>
              <span>
                <FontAwesomeIcon icon={faCheckCircle} /> {data.viewCount}
              </span>
              <span>
                <FontAwesomeIcon icon={faComment} /> {data.comments.length}
              </span>
            </div>
          </div>
          <div
            className={UtilStyle.imageSquareContainer}
            style={{ width: '120px' }}
          >
            <Image
              src={data.titleImg || VacantImage}
              layout="fixed"
              width="120px"
              height="120px"
              alt={data.title}
              blurDataURL={data.titleImg}
              placeholder="blur"
            />
          </div>
        </a>
      </Link>
    </li>
  );
};

export default TalkColumn;

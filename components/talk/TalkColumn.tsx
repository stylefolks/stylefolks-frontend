import { faCheckCircle, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import VacantImage from 'public/vacantImage.png';
import React from 'react';
import { getPostByCategory_getPostByCategory_post } from 'src/__generated__/getPostByCategory';
import TalkStyle from 'styles/talk/TalkPage.module.scss';
import { makePreContents } from 'utils/Utils';

interface TalkColumnProps
  extends Pick<
    getPostByCategory_getPostByCategory_post,
    'id' | 'title' | 'titleImg' | 'contents' | 'createdAt' | 'viewCount'
  > {
  nickname: string;
  commentsLength?: number;
}

const TalkColumn: React.FC<TalkColumnProps> = (props) => {
  const {
    id,
    title,
    titleImg,
    contents,
    createdAt,
    viewCount,
    commentsLength,
    nickname,
  } = props;

  return (
    <li className={TalkStyle.cardWrapper}>
      <Link href={`/post/${id}`}>
        <a>
          <div className={TalkStyle.cardContentsContainer}>
            <h3>{title}</h3>
            <span className={TalkStyle.cardContentsWrapper}>
              {makePreContents(contents).slice(0, 100)}
            </span>
            <div className={TalkStyle.cardConfigWrapper}>
              <span>{nickname}</span>
              <span>{format(new Date(createdAt), 'yyyy-MM-dd')}</span>
              <span>
                <FontAwesomeIcon icon={faCheckCircle} /> {viewCount}
              </span>
              {commentsLength && (
                <span>
                  <FontAwesomeIcon icon={faComment} /> {commentsLength}
                </span>
              )}
            </div>
          </div>
          <div style={{ width: '128px' }}>
            <Image
              alt={title}
              src={titleImg || VacantImage}
              layout={'responsive'}
              width={512}
              height={512}
              objectFit="cover"
              objectPosition="center"
              placeholder="blur"
              blurDataURL={titleImg}
            />
          </div>
        </a>
      </Link>
    </li>
  );
};

export default TalkColumn;

import format from 'date-fns/format';
import Image from 'next/image';
import { useRouter } from 'next/router';
import VacantImage from 'public/solidwhite.png';
import { getCrewByName_getCrewByName_posts } from 'src/__generated__/getCrewByName';
import UtilStyle from 'styles/common/Util.module.scss';
import CrewPageStyle from 'styles/crew/CrewPage.module.scss';

interface IPropsCrewNotice {
  posts: getCrewByName_getCrewByName_posts[];
}

const CrewNotice: React.FC<IPropsCrewNotice> = ({ posts }) => {
  const router = useRouter();

  return (
    <div className={CrewPageStyle.crewNoticeContainer}>
      <div>
        <h2>NOTICE</h2>
        <ul>
          {posts?.map((el) => (
            <li
              key={el.id}
              className={CrewPageStyle.noticeWrapper}
              onClick={() => router.push(`/post/${el.id}`)}
            >
              <div>
                <div className={UtilStyle.imageContainer}>
                  <Image
                    className="image"
                    src={el.titleImg || VacantImage}
                    layout="fill"
                    alt={el.title}
                  />
                </div>
                <div className={CrewPageStyle.eachNoticeInfoWrapper}>
                  <h3>DATE : {format(new Date(el.createdAt), 'yyyy-MM-dd')}</h3>
                  <h3>TITLE : {el.title}</h3>
                  <h3>VIEW : {el.viewCount}</h3>
                </div>
              </div>
              <div className={CrewPageStyle.eachNoticeWritterWrapper}>
                <h3>By </h3>
                <div>
                  <div className={UtilStyle.imageSmallCircleContainer}>
                    <Image
                      className="image"
                      src={el.user.profileImg || VacantImage}
                      layout="fill"
                      alt={el.user.profileImg}
                    />
                  </div>
                  <h4>{el.user.nickname}</h4>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CrewNotice;

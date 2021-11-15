import Image from 'next/image';
import Link from 'next/link';
import vacantImage from 'public/solidwhite.png';
import UserStyle from 'styles/User.module.scss';

interface IPropsSmallCircleProfile {
  name: string;
  profileImg: string;
}

const SmallCircleProfile: React.FC<IPropsSmallCircleProfile> = ({
  name,
  profileImg,
}) => {
  return (
    <li className={UserStyle.userJoinCrewWrapper}>
      <Link href={`/crew/${name}`}>
        <a>
          <div className={UserStyle.userJoinCrewImage}>
            <Image
              width="48px"
              height="48px"
              src={profileImg ? profileImg : vacantImage}
              alt="crewImage"
              placeholder="blur"
              blurDataURL={profileImg}
            />
          </div>
          <span>{name}</span>
        </a>
      </Link>
    </li>
  );
};

export default SmallCircleProfile;

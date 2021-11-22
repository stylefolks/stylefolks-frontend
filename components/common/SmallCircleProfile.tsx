import CircleProfileImage from 'components/common/CircleProfileImage';
import Link from 'next/link';
import UserStyle from 'styles/User.module.scss';
interface IPropsSmallCircleProfile {
  name: string;
  profileImg: string;
  link: string;
}

const SmallCircleProfile: React.FC<IPropsSmallCircleProfile> = ({
  name,
  profileImg,
  link,
}) => {
  return (
    <li className={UserStyle.userJoinCrewWrapper}>
      <Link href={link}>
        <a>
          <CircleProfileImage profileImg={profileImg} />
          <span>{name}</span>
        </a>
      </Link>
    </li>
  );
};

export default SmallCircleProfile;

import CircleProfileImage from 'components/common/CircleProfileImage';
import Link from 'next/link';
import UserStyle from 'styles/user/User.module.scss';
interface IPropsSmallCircleProfile {
  name: string;
  profileImg: string;
  link: string;
  width: number;
  height: number;
}

const SmallCircleProfile: React.FC<IPropsSmallCircleProfile> = ({
  name,
  profileImg,
  link,
  width,
  height,
}) => {
  return (
    <li className={UserStyle.userJoinCrewWrapper}>
      <Link href={link}>
        <a>
          <CircleProfileImage
            profileImg={profileImg}
            width={width}
            height={height}
          />
          <span className="joinName">{name}</span>
        </a>
      </Link>
    </li>
  );
};

export default SmallCircleProfile;

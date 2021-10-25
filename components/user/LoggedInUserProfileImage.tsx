import UseWindowDimension from 'hooks/useWindowDimension';
import { userInfoVar } from 'lib/apolloClient';
import Image from 'next/image';
import vacantImage from 'public/solidwhite.png';
import ProfileStyle from 'styles/Profile.module.scss';

interface IPropsLoggedInUserProfileImage {
  staticWidth?: string;
  staticHeight?: string;
}

const LoggedInUserProfileImage: React.FC<IPropsLoggedInUserProfileImage> = ({
  staticHeight,
  staticWidth,
}) => {
  const user = userInfoVar();
  const { width, height } = UseWindowDimension();

  return (
    <Image
      className={ProfileStyle.profileImage}
      src={user.profileImg ? user.profileImg : vacantImage}
      placeholder="blur"
      blurDataURL={user.profileImg}
      width={
        staticWidth
          ? staticWidth
          : (width * 4) / 100 >= 40
          ? (width * 4) / 100
          : '40px'
      }
      height={
        staticHeight
          ? staticHeight
          : (width * 4) / 100 >= 40
          ? (width * 4) / 100
          : '40px'
      }
      unoptimized={true}
      alt="profileImage"
    />
  );
};

export default LoggedInUserProfileImage;

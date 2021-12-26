import { useReactiveVar } from '@apollo/client';
import { userInfoVar } from 'cache/common/common.cache';
import UseWindowDimension from 'hooks/common/useWindowDimension';
import Image from 'next/image';
import vacantImage from 'public/vacantImage.png';
import ProfileStyle from 'styles/Profile.module.scss';

interface IPropsLoggedInUserProfileImage {
  staticWidth?: string;
  staticHeight?: string;
}

const LoggedInUserProfileImage: React.FC<IPropsLoggedInUserProfileImage> = ({
  staticHeight,
  staticWidth,
}) => {
  const user = useReactiveVar(userInfoVar);
  const { width } = UseWindowDimension();

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

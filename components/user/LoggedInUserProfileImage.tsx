import UseWindowDimension from 'hooks/useWindowDimension';
import { userInfoVar } from 'lib/apolloClient';
import Image from 'next/image';
import vacantImage from 'public/solidwhite.png';
import ProfileStyle from 'styles/Profile.module.scss';

const LoggedInUserProfileImage: React.FC = () => {
  const user = userInfoVar();
  const { width, height } = UseWindowDimension();

  return (
    <Image
      className={ProfileStyle.profileImage}
      src={user.profileImg ? user.profileImg : vacantImage}
      placeholder="blur"
      blurDataURL={user.profileImg}
      width={(width * 4) / 100 >= 40 ? (width * 4) / 100 : '40px'}
      height={(width * 4) / 100 >= 40 ? (width * 4) / 100 : '40px'}
      alt="profileImage"
    />
  );
};

export default LoggedInUserProfileImage;

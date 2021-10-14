import UseWindowDimension from 'hooks/useWindowDimension';
import Image from 'next/image';
import vacantImage from 'public/solidwhite.png';
import ProfileStyle from 'styles/Profile.module.scss';

interface IProfileRoundImage {
  imgSrc?: string;
}

const ProfileRoundImage: React.FC<IProfileRoundImage> = ({ imgSrc }) => {
  const { width, height } = UseWindowDimension();

  return (
    <Image
      className={ProfileStyle.profileImage}
      src={imgSrc ? imgSrc : vacantImage}
      width={(width * 4) / 100 >= 40 ? (width * 4) / 100 : '40px'}
      height={(width * 4) / 100 >= 40 ? (width * 4) / 100 : '40px'}
      alt="profileImage"
    />
  );
};

export default ProfileRoundImage;

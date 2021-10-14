import Image from 'next/image';
import vacantImage from 'public/solidwhite.png';
import ProfileStyle from 'styles/Profile.module.scss';

interface IProfileRoundImage {
  imgSrc?: string;
}

const ProfileRoundImage: React.FC<IProfileRoundImage> = ({ imgSrc }) => {
  return (
    <Image
      className={ProfileStyle.profileImage}
      src={imgSrc ? imgSrc : vacantImage}
      width={
        (window.innerWidth * 4) / 100 >= 40
          ? (window.innerWidth * 4) / 100
          : '40px'
      }
      height={
        (window.innerWidth * 4) / 100 >= 40
          ? (window.innerWidth * 4) / 100
          : '40px'
      }
      alt="profileImage"
    />
  );
};

export default ProfileRoundImage;

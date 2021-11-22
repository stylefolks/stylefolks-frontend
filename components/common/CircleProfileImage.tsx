import Image from 'next/image';
import vacantImage from 'public/vacantImage.png';
import UtilStyle from 'styles/common/Util.module.scss';
interface IPropsCircleProfileImage {
  profileImg: string;
}

const CircleProfileImage: React.FC<IPropsCircleProfileImage> = ({
  profileImg,
}) => {
  return (
    <div className={UtilStyle.smallCircleProfileWrapper}>
      <Image
        width="48px"
        height="48px"
        src={profileImg ? profileImg : vacantImage}
        alt="crewImage"
        placeholder="blur"
        blurDataURL={profileImg}
      />
    </div>
  );
};

export default CircleProfileImage;

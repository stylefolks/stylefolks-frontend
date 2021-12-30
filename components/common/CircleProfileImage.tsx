import Image from 'next/image';
import vacantImage from 'public/vacantImage.png';
import UtilStyle from 'styles/common/Util.module.scss';
interface IPropsCircleProfileImage {
  profileImg: string;
  width: number;
  height: number;
}

const CircleProfileImage: React.FC<IPropsCircleProfileImage> = ({
  profileImg,
}) => {
  return (
    <div className={UtilStyle.smallCircleProfileWrapper}>
      <Image
        width={48}
        height={48}
        layout="fixed"
        objectFit="cover"
        src={profileImg ? profileImg : vacantImage}
        alt="crewImage"
        placeholder="blur"
        blurDataURL={profileImg}
      />
    </div>
  );
};

export default CircleProfileImage;

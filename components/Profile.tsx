import Image from 'next/image';
import { useRouter } from 'next/router';
import { isLoggedInVar } from '../lib/apolloClient';
import vacantImage from '../public/solidwhite.png';
import { UserRole } from '../src/__generated__/globalTypes';
import ProfileStyle from '../styles/Profile.module.scss';
import UtilStyle from '../styles/Util.module.scss';
interface IProps {
  nickname?: string;
  email?: string;
  role?: UserRole;
  profileImage?: string;
  id?: number;
}

const Profile: React.FC<IProps> = ({
  nickname,
  profileImage,
  email,
  id,
  role,
}) => {
  const router = useRouter();
  return (
    <>
      {isLoggedInVar() === true ? (
        <div
          className={`${ProfileStyle.profileContainer} ${UtilStyle.flexCenter}`}
        >
          <div className={ProfileStyle.profileImageWrapper}>
            <Image
              className={ProfileStyle.profileImage}
              src={profileImage ? profileImage : vacantImage}
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
          </div>
        </div>
      ) : (
        <span onClick={() => router.push('/login')}>Go to Logging In You</span>
      )}

      <style jsx>{`
        .profileWrapper {
          position: relative;
        }
      `}</style>
    </>
  );
};

export default Profile;

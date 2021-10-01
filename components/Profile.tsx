import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
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
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const router = useRouter();
  return (
    <>
      <div
        className={`${ProfileStyle.profileContainer} ${UtilStyle.flexCenter}`}
        onClick={() => router.push(`/user/${id}`)}
      >
        <div onClick={() => setIsVisible((prev) => !prev)}>
          <Image
            className={ProfileStyle.profileImage}
            src={profileImage ? profileImage : vacantImage}
            width="45px"
            height="45px"
            alt="profileImage"
          />
        </div>
        <div>
          <h2>Mail | {email}</h2>
          <h3>NickName | {nickname}</h3>
          <h3>User Role | {role}</h3>
        </div>
      </div>
      <style jsx>{`
        .profileWrapper {
          position: relative;
        }

        @keyframes slideIn {
          100% {
            transform: translateY(0);
            opacity: 100;
          }
          0% {
            transform: translateY(10px);
            opacity: 0;
          }
        }

        @keyframes slideOut {
          100% {
            transform: translateY(-10px);
            opacity: 0;
          }
          0% {
            transform: translateY(10px);
            opacity: 100;
          }
        }

        .popupWrapper {
          border: 1px solid #efeff0;
        }

        .visibleProfile {
          visibility: visible;
          position: absolute;
          transition: all 0.3s ease-in-out;
          animation-duration: 0.6s;
          animation-name: slideIn;
        }

        .unvisibleProfile {
          visibility: hidden;
          position: absolute;
          transition: all 0.3s ease-in-out;
          animation-duration: 0.6s;
          animation-name: slideOut;
        }
      `}</style>
    </>
  );
};

export default Profile;

import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
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

interface IModalState {
  isVisible: boolean;
  location: number;
}

const Profile: React.FC<IProps> = ({
  nickname,
  profileImage,
  email,
  id,
  role,
}) => {
  const router = useRouter();
  const ref = React.createRef<HTMLDivElement>();
  const [modalState, setModalState] = useState<IModalState>({
    isVisible: false,
    location: 0,
  });

  return (
    <>
      {isLoggedInVar() === true ? (
        <div
          ref={ref}
          className={`${ProfileStyle.profileContainer} ${UtilStyle.flexCenter}`}
          onClick={() => {
            setModalState({
              isVisible: !modalState.isVisible,
              location: ref.current.clientHeight + 10,
            });

            // console.log(ref.current.clientHeight);
          }}
        >
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
          <div className={modalState.isVisible ? 'profilePopup' : 'inVisible'}>
            <div className="direction" />
            <div
              className={`${ProfileStyle.popupProfileText} ${UtilStyle.flexColumnCenter}`}
            >
              <span>Profile</span>
              <span>Post</span>
              <span onClick={() => router.push('/logout')}>Log Out</span>
            </div>
          </div>
        </div>
      ) : (
        <span onClick={() => router.push('/login')}>Do Login</span>
      )}
      <style jsx>{`
        .profilePopup {
          position: absolute;
          visibility: visible;
          top: ${`${modalState.location}px`};
          border: 1px solid black;
          border-radius: 2px;
        }

        .inVisible {
          visibility: hidden;
          width: 0px;
          height: 0px;
        }
      `}</style>
    </>
  );
};

export default Profile;

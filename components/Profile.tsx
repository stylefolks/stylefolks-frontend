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
  top: number;
  right: number;
  direction: number;
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
    top: 0,
    right: 0,
    direction: 0,
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
              top: ref.current.clientHeight + 10,
              right:
                ref.current.getBoundingClientRect().right -
                ref.current.getBoundingClientRect().left -
                ref.current.getBoundingClientRect().width,
              direction:
                (window.innerWidth * 4) / 100 >= 40
                  ? (window.innerWidth * 4) / 100 / 2
                  : 40 / 2,
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
          <div
            className={
              modalState.isVisible
                ? 'profilePopup'
                : `${ProfileStyle.unvisibleProfile}`
            }
          >
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
        <button onClick={() => router.push('/login')} className="loginText">
          Login
        </button>
      )}
      <style jsx>{`
        .loginText {
          font-size: 1vw;
          border: 1px solid #efeff0;
          border-radius: 2px;
          padding: 1vw;
          color: black;
        }

        .loginText:hover {
          background-color: #efeff0;
          color: #22bad9;
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

        .profilePopup {
          position: absolute;
          visibility: visible;
          top: ${`${modalState.top}px`};
          right: ${`${modalState.right}px`};
          border: 1px solid black;
          border-radius: 2px;
          animation-duration: 0.3s;
          animation-name: slideIn;
          z-index: 2;
        }
        .direction {
          position: absolute;
          top: -6px;
          right: calc(${`${modalState.direction}px`} - 8px);
          width: 14px;
          height: 14px;
          border: 1px solid black;
          transform: rotate(45deg);
          background-color: white;
          z-index: -1;
        }

        .inVisible {
          visibility: hidden;
          width: 0px;
          height: 0px;
          animation-duration: 0.3s;
          animation-name: slideOut;
        }
      `}</style>
    </>
  );
};

export default Profile;

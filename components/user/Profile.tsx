import {
  authTokenVar,
  initialUserInfoVar,
  isLoggedInVar,
  IUserInforVar,
  userInfoVar,
} from 'cache/common/common.cache';
import UseWindowDimension from 'hooks/common/useWindowDimension';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import UtilStyle from 'styles/common/Util.module.scss';
import ProfileStyle from 'styles/user/Profile.module.scss';
import { removeSpinner } from 'utils/Utils';
import LoggedInUserProfileImage from './LoggedInUserProfileImage';

interface IModalState {
  isVisible: boolean;
  top: number;
  right: number;
  direction: number;
}

interface IProfileProps {
  user: IUserInforVar;
}

const Profile: React.FC<IProfileProps> = ({ user }) => {
  const router = useRouter();

  const ref = React.createRef<HTMLDivElement>();
  const { width } = UseWindowDimension();
  const [modalState, setModalState] = useState<IModalState>({
    isVisible: false,
    top: 0,
    right: 0,
    direction: 0,
  });

  const doLogout = () => {
    authTokenVar('');
    localStorage.clear();
    isLoggedInVar(false);
    userInfoVar({ ...initialUserInfoVar });
    removeSpinner();
    router.push('/login');
  };

  return (
    <>
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
            direction: (width * 4) / 100 >= 40 ? (width * 4) / 100 / 2 : 40 / 2,
          });
        }}
      >
        <LoggedInUserProfileImage />
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
            <span onClick={() => router.push(`/user/${user.nickname}`)}>
              Profile
            </span>
            <span
              onClick={() => {
                router.push(`/upload`);
              }}
            >
              Upload
            </span>
            <span onClick={doLogout}>Log Out</span>
          </div>
        </div>
      </div>

      <style jsx>{`
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

        .profilePopup {
          position: absolute;
          visibility: visible;
          top: ${`${modalState.top}px`};
          right: ${`${modalState.right}px`};
          border: 1px solid black;
          border-radius: 2px;
          animation-duration: 0.3s;
          animation-name: slideIn;
          z-index: 3;
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
      `}</style>
    </>
  );
};

export default Profile;

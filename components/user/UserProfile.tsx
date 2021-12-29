import { useReactiveVar } from '@apollo/client';
import {
  faArrowCircleLeft,
  faClone,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userInfoVar } from 'cache/common/common.cache';
import {
  isUserTotalPostVar,
  isVisibleEditProfileModalVar,
  isVisibleProfileImageModalVar,
} from 'cache/user/user.cache';
import SmallCircleProfile from 'components/common/SmallCircleProfile';
import Image from 'next/image';
import vacantImage from 'public/vacantImage.png';
import React, { useEffect, useState } from 'react';
import {
  findByNickName_findByNickName_crews,
  findByNickName_findByNickName_user,
} from 'src/__generated__/findByNickName';
import UserStyle from 'styles/user/User.module.scss';

interface IUserProfileProps {
  user: findByNickName_findByNickName_user | null;
  crews: findByNickName_findByNickName_crews[] | null;
}

const UserProfile: React.FC<IUserProfileProps> = ({
  user: pageUser,
  crews,
}) => {
  const user = useReactiveVar(userInfoVar);

  const [isChange, setIsChange] = useState<boolean>(false);
  const [localVal, setLocalVal] = useState({ nick: '', link: '' });
  const [isUser, setIsUser] = useState<boolean>(false);

  useEffect(() => {
    setLocalVal({
      nick: user.nickname,
      link: user.link,
    });
  }, [isChange]);

  const onClick = () => {
    isVisibleProfileImageModalVar(true);
  };

  const onEdit = () => {
    setIsChange(true);
    //여기는 유저 정보 전체 수정 가능한 모달 열리는 곳 으로 만들기
    isVisibleEditProfileModalVar(true);
  };

  useEffect(() => {
    if (user.nickname === pageUser.nickname) setIsUser(true);
  }, []);

  return (
    <>
      <div className={UserStyle.userInfoContainer}>
        <div className={UserStyle.userInfoWrapper}>
          <div
            className={UserStyle.userImageWrapper}
            onClick={isUser ? onClick : () => null}
          >
            <Image
              src={
                pageUser?.profileImg ? pageUser?.profileImg : vacantImage.src
              }
              alt="profile-image"
              width="120px"
              height="120px"
              layout={'intrinsic'}
              unoptimized={true}
              placeholder="blur"
              blurDataURL={
                pageUser?.profileImg ? pageUser?.profileImg : vacantImage.src
              }
            />
          </div>
          <div className={UserStyle.userInfoBioWrapper}>
            <h4>{pageUser?.role}</h4>
            <h2> {pageUser?.nickname}</h2>
            <a href={pageUser?.link} target="_blank" rel="noreferrer">
              Link Of {pageUser?.nickname}
            </a>
          </div>
        </div>
        {isUser && (
          <div className={UserStyle.userProfileButtonContainer}>
            <button>
              <FontAwesomeIcon icon={faUserCog} size="2x" onClick={onEdit} />
            </button>
            {isUserTotalPostVar() ? (
              <button>
                <FontAwesomeIcon
                  icon={faArrowCircleLeft}
                  size="2x"
                  onClick={() => isUserTotalPostVar(!isUserTotalPostVar())}
                />
              </button>
            ) : (
              <button>
                <FontAwesomeIcon
                  icon={faClone}
                  size="2x"
                  onClick={() => isUserTotalPostVar(!isUserTotalPostVar())}
                />
              </button>
            )}
          </div>
        )}
      </div>
      <div className={UserStyle.userJoinCrewContainer}>
        {crews?.length ? <h4>Joined Crew</h4> : ''}
        <ul>
          {crews?.length
            ? crews?.map((el) => (
                <SmallCircleProfile
                  link={`/crew/${el.name}`}
                  key={el.id}
                  name={el.name}
                  profileImg={el.profileImg}
                />
              ))
            : ''}
        </ul>
      </div>
    </>
  );
};

export default UserProfile;

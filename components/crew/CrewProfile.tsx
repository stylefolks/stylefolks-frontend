import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { mediaStandard } from 'constants/constants';
import UseWindowDimension from 'hooks/useWindowDimension';
import Image from 'next/image';
import React from 'react';
import CrewProfileStyle from 'styles/crew/CrewProfile.module.scss';
interface ICrewProfileProps {
  name: string;
  backgroundImg: string | StaticImageData;
  profileImg: string | StaticImageData;
  isJoined: boolean;
  doJoin: () => void;
  doDepart: () => void;
}

const CrewProfile: React.FC<ICrewProfileProps> = ({
  profileImg,
  name,
  backgroundImg,
  isJoined,
  doJoin,
  doDepart,
}) => {
  const { width, height } = UseWindowDimension();

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImg})` }}
      className={CrewProfileStyle.container}
    >
      <div className={CrewProfileStyle.infoContainer}>
        <div className={CrewProfileStyle.imgWrapper}>
          <Image
            src={profileImg}
            alt="profile-image"
            width={width > mediaStandard ? '160px' : '80px'}
            height={width > mediaStandard ? '160px' : '80px'}
            unoptimized={true}
            placeholder="blur"
            blurDataURL={profileImg as string}
          />
        </div>
        <h2>{name}</h2>
        <div className={CrewProfileStyle.btnWrapper}>
          <div>
            {isJoined ? (
              <FontAwesomeIcon
                icon={faSignOutAlt}
                size={width <= 735 ? '1x' : '2x'}
                onClick={doDepart}
              />
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faSignInAlt}
                  size={width <= 735 ? '1x' : '2x'}
                  onClick={doJoin}
                />
              </>
            )}
          </div>
          {/* <Button
            actionText="연결하기"
            loading={false}
            canClick
            onClick={() => null}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default CrewProfile;

import { Button } from 'components/common/Button';
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
  return (
    <section
      style={{ backgroundImage: `url(${backgroundImg})` }}
      className={CrewProfileStyle.container}
    >
      <div className={CrewProfileStyle.infoContainer}>
        <div className={CrewProfileStyle.imgWrapper}>
          <Image
            src={profileImg}
            alt="profile-image"
            width="160px"
            height="160px"
            unoptimized={true}
            placeholder="blur"
            blurDataURL={profileImg as string}
          />
        </div>
        <h2>{name}</h2>
        <div className={CrewProfileStyle.btnWrapper}>
          {isJoined ? (
            <Button
              actionText="탈퇴하기"
              loading={false}
              canClick
              onClick={doDepart}
            />
          ) : (
            <Button
              actionText="가입하기"
              loading={false}
              canClick
              onClick={doJoin}
            />
          )}
          <Button
            actionText="연결하기"
            loading={false}
            canClick
            onClick={() => null}
          />
        </div>
      </div>
    </section>
  );
};

export default CrewProfile;

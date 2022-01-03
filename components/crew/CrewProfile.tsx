import { ApolloQueryResult } from '@apollo/client';
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import {
  faCog,
  faHouseUser,
  faSignInAlt,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UseWindowDimension from 'hooks/common/useWindowDimension';
import Image from 'next/image';
import Link from 'next/link';
import vacantImage from 'public/vacantImage.png';
import React, { useState } from 'react';
import {
  getCrewByName,
  getCrewByNameVariables,
  getCrewByName_getCrewByName_crew,
} from 'src/__generated__/getCrewByName';
import { CrewLinkType } from 'src/__generated__/globalTypes';
import CrewProfileStyle from 'styles/crew/CrewProfile.module.scss';
import CrewModifyModal from './CrewModifyModal';
interface ICrewProfileProps {
  data: getCrewByName_getCrewByName_crew;

  isManager: boolean;
  isJoined: boolean;
  doJoin: () => void;
  doDepart: () => void;
  refetch: (
    variables?: Partial<getCrewByNameVariables>
  ) => Promise<ApolloQueryResult<getCrewByName>>;
}

const LINK_TYPE_HASH = {
  [CrewLinkType.HOME]: faHouseUser,
  [CrewLinkType.YOUTUBE]: faYoutube,
  [CrewLinkType.INSTAGRAM]: faInstagram,
};

const CrewProfile: React.FC<ICrewProfileProps> = ({
  data,
  isManager,
  isJoined,
  doJoin,
  doDepart,
  refetch,
}) => {
  const { width } = UseWindowDimension();
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div
      style={{
        backgroundImage: `url(${
          data?.backgroundImg ? data.backgroundImg : ''
        })`,
      }}
      className={CrewProfileStyle.container}
    >
      <div className={CrewProfileStyle.infoContainer}>
        <div className={CrewProfileStyle.linkWrapper}>
          {data?.link.map((el) => (
            <div key={el.type}>
              <Link href={el.href}>
                <a target="_blank">
                  <FontAwesomeIcon icon={LINK_TYPE_HASH[el.type]} size="2x" />
                </a>
              </Link>
            </div>
          ))}
        </div>
        <div className={CrewProfileStyle.imgWrapper}>
          <Image
            src={data?.profileImg ? data?.profileImg : vacantImage}
            blurDataURL={data?.profileImg}
            width={120}
            height={120}
            alt="profile-image"
            layout="fixed"
            objectFit="cover"
            quality={70}
            placeholder="blur"
          />
        </div>
        <h2>{data?.name}</h2>
        <div className={CrewProfileStyle.btnWrapper}>
          {!isManager && (
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
          )}

          {isManager && (
            <div onClick={() => setVisible(true)}>
              <FontAwesomeIcon icon={faCog} size={width <= 735 ? '1x' : '2x'} />
            </div>
          )}
          {/* <Button
            actionText="연결하기"
            loading={false}
            canClick
            onClick={() => null}
          /> */}
        </div>
      </div>
      {isManager && (
        <CrewModifyModal
          refetch={refetch}
          visible={visible}
          data={data}
          onQuit={() => {
            setVisible(false);
          }}
        />
      )}
    </div>
  );
};

export default CrewProfile;

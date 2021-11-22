import { faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userInfoVar } from 'cache/common/common.cache';
import SmallCircleProfile from 'components/common/SmallCircleProfile';
import React, { useState } from 'react';
import { getCrewByName_getCrewByName_users } from 'src/__generated__/getCrewByName';
import CrewPageStyle from 'styles/crew/CrewPage.module.scss';
import CrewManagePeopleModal from './CrewManagePeopleModal';

interface ICrewJoinedPeople {
  users: getCrewByName_getCrewByName_users[];
  managerId: number;
}

const CrewJoinedPeople: React.FC<ICrewJoinedPeople> = ({
  users,
  managerId,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className={CrewPageStyle.joinedPeopleContaier}>
      {users?.length ? (
        <>
          <div>
            <h4>Joined People</h4>
            {userInfoVar().id === managerId ? (
              <div>
                <FontAwesomeIcon
                  icon={faUsersCog}
                  size="2x"
                  onClick={() => setIsVisible((prev) => !prev)}
                />
              </div>
            ) : (
              ''
            )}
          </div>

          <ul>
            {users?.map((el) => (
              <SmallCircleProfile
                link={`/user/${el.nickname}`}
                key={el.id}
                name={el.nickname}
                profileImg={el.profileImg}
              />
            ))}
          </ul>
        </>
      ) : (
        ''
      )}
      <CrewManagePeopleModal
        users={users}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </div>
  );
};

export default CrewJoinedPeople;

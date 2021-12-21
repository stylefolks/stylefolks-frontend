import { useReactiveVar } from '@apollo/client';
import { faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { modalVisibleVar, userInfoVar } from 'cache/common/common.cache';
import SmallCircleProfile from 'components/common/SmallCircleProfile';
import React from 'react';
import { getCrewByName_getCrewByName_users } from 'src/__generated__/getCrewByName';
import CrewPageStyle from 'styles/crew/CrewPage.module.scss';

interface ICrewJoinedPeople {
  users: getCrewByName_getCrewByName_users[];
  managerId: number;
}

const CrewJoinedPeople: React.FC<ICrewJoinedPeople> = ({
  users,
  managerId,
}) => {
  const userInfo = useReactiveVar(userInfoVar);

  return (
    <div className={CrewPageStyle.joinedPeopleContaier}>
      {users?.length ? (
        <>
          <div>
            <h4>Joined People</h4>
            {userInfo.id === managerId ? (
              <div>
                <FontAwesomeIcon
                  icon={faUsersCog}
                  size="2x"
                  onClick={() => {
                    modalVisibleVar({
                      ...modalVisibleVar(),
                      isVisibleCrewUserManageModal: true,
                    });
                  }}
                />
              </div>
            ) : (
              ''
            )}
          </div>

          <ul>
            {users?.map((el) => (
              <SmallCircleProfile
                link={`/user/${el.user.nickname}`}
                key={el.user.id}
                name={el.user.nickname}
                profileImg={el.user.profileImg}
              />
            ))}
          </ul>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default CrewJoinedPeople;

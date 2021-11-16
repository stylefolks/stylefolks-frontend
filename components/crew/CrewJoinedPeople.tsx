import SmallCircleProfile from 'components/common/SmallCircleProfile';
import React from 'react';
import { getCrewByName_getCrewByName_users } from 'src/__generated__/getCrewByName';
import CrewPageStyle from 'styles/crew/CrewPage.module.scss';

interface ICrewJoinedPeople {
  users: getCrewByName_getCrewByName_users[];
}

const CrewJoinedPeople: React.FC<ICrewJoinedPeople> = ({ users }) => {
  return (
    <div className={CrewPageStyle.joinedPeopleContaier}>
      {users?.length ? (
        <>
          <h4>Joined People</h4>
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
    </div>
  );
};

export default CrewJoinedPeople;

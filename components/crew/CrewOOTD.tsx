import { useQuery } from '@apollo/client';
import { faUserCheck, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import Image from 'next/image';
import VacantImage from 'public/solidwhite.png';
import React, { useState } from 'react';
import {
  getCrewPostByRole,
  getCrewPostByRoleVariables,
} from 'src/__generated__/getCrewPostByRole';
import { CrewUserGrade } from 'src/__generated__/globalTypes';
import UtilStyle from 'styles/common/Util.module.scss';
import CrewPageStyle from 'styles/crew/CrewPage.module.scss';

interface IPropsCrewOOTD {
  crewId: number;
}

const GET_CREW_POST_BY_ROLE = gql`
  query getCrewPostByRole($input: GetCrewPostByRoleInput!) {
    getCrewPostByRole(input: $input) {
      ok
      error
      posts {
        title
        titleImg
        id
        viewCount
      }
    }
  }
`;

const CrewOOTD: React.FC<IPropsCrewOOTD> = ({ crewId }) => {
  const [role, setRole] = useState(CrewUserGrade.CrewManager);
  const { data, loading, error } = useQuery<
    getCrewPostByRole,
    getCrewPostByRoleVariables
  >(GET_CREW_POST_BY_ROLE, {
    variables: {
      input: {
        grade: role,
        crewId,
      },
    },
  });

  console.log(data);
  if (loading) return <div>Loading..</div>;

  return (
    <div className={CrewPageStyle.crewOutfitContainer}>
      <h2>CREW OUTFIT</h2>
      <div className={CrewPageStyle.crewOutfitWrapper}>
        <div className={CrewPageStyle.crewOutfitToggleButtonWrapper}>
          <button onClick={() => setRole(CrewUserGrade.CrewManager)}>
            <FontAwesomeIcon icon={faUserCheck} size="2x" />
          </button>
          <button onClick={() => setRole(CrewUserGrade.CrewUser)}>
            <FontAwesomeIcon icon={faUserFriends} size="2x" />
          </button>
        </div>
        <ul className={CrewPageStyle.crewOutfitContentsContainer}>
          {data?.getCrewPostByRole.posts.map((el) => (
            <li key={el.id}>
              <div className={UtilStyle.imageSmallCircleContainer}>
                <Image
                  className="image"
                  src={el.titleImg || VacantImage}
                  layout="fill"
                  alt={el.titleImg}
                />
              </div>

              <span>
                {el.title}
                {el.viewCount}
                {/* {el.user.nickname} */}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CrewOOTD;

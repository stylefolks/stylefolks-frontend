import { useQuery } from '@apollo/client';
import {
  faCheck,
  faUserCheck,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PagesDivider from 'components/common/PagesDivider';
import gql from 'graphql-tag';
import Image from 'next/image';
import Link from 'next/link';
import VacantImage from 'public/solidwhite.png';
import React, { useEffect, useState } from 'react';
import { getCrewByName_getCrewByName_users } from 'src/__generated__/getCrewByName';
import {
  getCrewPostByRole,
  getCrewPostByRoleVariables,
} from 'src/__generated__/getCrewPostByRole';
import { CrewUserGrade } from 'src/__generated__/globalTypes';
import CrewPageStyle from 'styles/crew/CrewPage.module.scss';
import UserPageStyle from 'styles/user/UserPage.module.scss';

interface IPropsCrewOOTD {
  crewId: number;
  users: getCrewByName_getCrewByName_users[];
}

const BUTTON_NAME_MAP = [
  { role: CrewUserGrade.CrewManager, icon: faUserCheck },
  { role: CrewUserGrade.CrewUser, icon: faUserFriends },
];

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
      totalPages
      totalResults
    }
  }
`;

const CrewOOTD: React.FC<IPropsCrewOOTD> = ({ crewId, users }) => {
  const [role, setRole] = useState(CrewUserGrade.CrewManager);
  const [page, setPage] = useState<number>(1);
  // const [inputTake, setInputTake] = useState<number | null>(20);

  const handlePage = (_page: number) => {
    setPage(_page);
  };
  const { data, loading, error, refetch } = useQuery<
    getCrewPostByRole,
    getCrewPostByRoleVariables
  >(GET_CREW_POST_BY_ROLE, {
    nextFetchPolicy: 'cache-and-network',
    variables: {
      input: {
        grade: role,
        crewId,
        inputTake: 20,
        page,
      },
    },
  });

  useEffect(() => {
    refetch();
  }, [users]);

  if (loading) return <div>Loading..</div>;

  return (
    <div className={CrewPageStyle.crewOutfitContainer}>
      <h2>CREW OUTFIT</h2>
      <div className={CrewPageStyle.crewOutfitWrapper}>
        <div className={`${CrewPageStyle.crewOutfitToggleButtonWrapper} `}>
          {BUTTON_NAME_MAP.map((el) => (
            <button
              className={el.role === role ? `${CrewPageStyle.isActive}` : ''}
              onClick={() => setRole(el.role)}
              key={el.role}
            >
              <FontAwesomeIcon icon={el.icon} size="2x" />
            </button>
          ))}
        </div>
        <div className={CrewPageStyle.crewOutfitContentsContainer}>
          <ul className={CrewPageStyle.crewOutfitContentsWrapper}>
            {data?.getCrewPostByRole.posts.map((el) => (
              <li key={el.id}>
                <Link href={`/post/${el.id}`}>
                  <a>
                    <div className={CrewPageStyle.gridImage}>
                      <Image
                        className="image"
                        src={el.titleImg || VacantImage}
                        layout="fill"
                        alt={el.titleImg}
                      />
                    </div>
                    <div>
                      <span>{el.title}</span>
                      <span>
                        <FontAwesomeIcon icon={faCheck} /> {el.viewCount}
                      </span>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <div className={UserPageStyle.seeMoreButton}>
            <PagesDivider
              totalPages={data?.getCrewPostByRole.totalPages}
              totalResults={data?.getCrewPostByRole.totalResults}
              clickPage={page}
              onClick={handlePage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrewOOTD;

import { useQuery } from '@apollo/client';
import {
  faCheck,
  faUserCheck,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoPost from 'components/common/NoPost';
import PagesDivider from 'components/common/PagesDivider';
import { GET_CREW_POST_BY_ROLE } from 'graphql/crew/queries';
import UseWindowDimension from 'hooks/common/useWindowDimension';
import Image from 'next/image';
import Link from 'next/link';
import VacantImage from 'public/vacantImage.png';
import React, { useEffect, useState } from 'react';
import { getCrewByName_getCrewByName_users } from 'src/__generated__/getCrewByName';
import {
  getCrewPostByRole,
  getCrewPostByRoleVariables,
} from 'src/__generated__/getCrewPostByRole';
import { CrewUserGrade } from 'src/__generated__/globalTypes';
import GridStyle from 'styles/common/Grid.module.scss';
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

const CrewOOTD: React.FC<IPropsCrewOOTD> = ({ crewId, users }) => {
  const [role, setRole] = useState(CrewUserGrade.CrewManager);
  const [page, setPage] = useState<number>(1);
  const { width, height } = UseWindowDimension();

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
        inputTake: 9,
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
              <FontAwesomeIcon
                icon={el.icon}
                size={width <= 735 ? '1x' : '2x'}
              />
            </button>
          ))}
        </div>
        <div className={CrewPageStyle.crewOutfitContentsContainer}>
          {data?.getCrewPostByRole.posts.length ? (
            <ul className={GridStyle.gridContentsBlockList}>
              {data?.getCrewPostByRole.posts.map((el) => (
                <li key={el.id}>
                  <Link href={`/post/${el.id}`}>
                    <a>
                      <div>
                        <Image
                          className="image"
                          src={el.titleImg || VacantImage}
                          layout="responsive"
                          width={512}
                          height={512}
                          objectFit="cover"
                          objectPosition="center"
                          placeholder="blur"
                          blurDataURL={el.titleImg}
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
          ) : (
            <NoPost />
          )}

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

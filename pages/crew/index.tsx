import { useQuery } from '@apollo/client';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircleProfileImage from 'components/common/CircleProfileImage';
import gql from 'graphql-tag';
import Link from 'next/link';
import { useState } from 'react';
import { getAllCrew, getAllCrewVariables } from 'src/__generated__/getAllCrew';
import UtilStyle from 'styles/common/Util.module.scss';
import CrewPageStyle from 'styles/crew/CrewPage.module.scss';
const GET_ALL_CREW = gql`
  query getAllCrew($input: GetAllCrewInput!) {
    getAllCrew(input: $input) {
      ok
      error
      crew {
        id
        profileImg
        name
        introduction
        backgroundImg
        followerCount
      }
    }
  }
`;

const Crew = () => {
  const [inputTake, setInputTake] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const { data, loading, error } = useQuery<getAllCrew, getAllCrewVariables>(
    GET_ALL_CREW,
    {
      variables: {
        input: {
          page,
          inputTake: 9,
        },
      },
    }
  );

  console.log(data);

  return (
    <div className={UtilStyle.mainContainer}>
      <ul className={CrewPageStyle.crewMainPageContentsContainer}>
        {data?.getAllCrew.crew.map((el) => (
          <Link href={`/crew/${el.name}`} key={el.id}>
            <a>
              <li
                className={CrewPageStyle.crewMainPageEachContents}
                style={{
                  backgroundImage: `url(${
                    el.backgroundImg ? el.backgroundImg : ''
                  })`,
                }}
              >
                <div>
                  <CircleProfileImage profileImg={el.profileImg} />
                </div>
                <h2>{el.name}</h2>
                <h3>
                  <FontAwesomeIcon icon={faUser} />
                  {el.followerCount}
                </h3>
              </li>
            </a>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Crew;

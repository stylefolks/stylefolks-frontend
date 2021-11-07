import { gql, useQuery } from '@apollo/client';
import CrewProfile from 'components/crew/CrewProfile';
import { useRouter } from 'next/router';
import React from 'react';
import {
  getCrewByName,
  getCrewByNameVariables,
} from 'src/__generated__/getCrewByName';
import CrewPageStyle from 'styles/crew/CrewPage.module.scss';

const GET_CREW_BY_NAME = gql`
  query getCrewByName($input: GetCrewByNameInput!) {
    getCrewByName(input: $input) {
      ok
      error
      crew {
        profileImg
        name
        Introduction
        backgroundImg
        users {
          id
          nickname
        }
      }
    }
  }
`;

const Crew = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const { data, loading, error } = useQuery<
    getCrewByName,
    getCrewByNameVariables
  >(GET_CREW_BY_NAME, {
    variables: {
      input: {
        name: id as string,
      },
    },
  });

  if (loading) return <div>Loading...</div>;

  return (
    <main className={CrewPageStyle.container}>
      <CrewProfile
        name={data.getCrewByName.crew.name}
        backgroundImg={data.getCrewByName.crew.backgroundImg}
        profileImg={data.getCrewByName.crew.profileImg}
      />
      <div>{data?.getCrewByName?.crew.name}</div>
      <div>
        <span>Joined Person</span>
        {data?.getCrewByName?.crew.users.map((el, index) => (
          <div key={index}>{el.nickname}</div>
        ))}
      </div>
    </main>
  );
};

export default Crew;

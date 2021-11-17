import { gql, useQuery } from '@apollo/client';
import CrewJoinedPeople from 'components/crew/CrewJoinedPeople';
import CrewNotice from 'components/crew/CrewNotice';
import CrewOOTD from 'components/crew/CrewOOTD';
import CrewProfile from 'components/crew/CrewProfile';
import { useRouter } from 'next/router';
import VacantImage from 'public/solidwhite.png';
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
        id
        profileImg
        name
        Introduction
        backgroundImg
      }
      users {
        id
        nickname
        profileImg
        crewUser {
          grade
        }
      }
    }
  }
`;

const Crew = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery<
    getCrewByName,
    getCrewByNameVariables
  >(GET_CREW_BY_NAME, {
    variables: {
      input: {
        name: id + '',
      },
    },
  });

  if (loading) return <div>Loading...</div>;

  return (
    <main className={CrewPageStyle.container}>
      <CrewProfile
        name={data?.getCrewByName.crew?.name}
        backgroundImg={data?.getCrewByName.crew?.backgroundImg || VacantImage}
        profileImg={data?.getCrewByName.crew?.profileImg || VacantImage}
      />
      <CrewJoinedPeople users={data?.getCrewByName.users} />
      <CrewNotice
        posts={data?.getCrewByName?.posts}
        crewId={data.getCrewByName.crew.id}
      />
      <CrewOOTD crewId={data?.getCrewByName.crew.id} />
    </main>
  );
};

export default Crew;

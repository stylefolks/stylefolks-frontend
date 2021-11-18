import { gql, useMutation, useQuery } from '@apollo/client';
import { userInfoVar } from 'cache/common/common.cache';
import CrewJoinedPeople from 'components/crew/CrewJoinedPeople';
import CrewNotice from 'components/crew/CrewNotice';
import CrewOOTD from 'components/crew/CrewOOTD';
import CrewProfile from 'components/crew/CrewProfile';
import { useRouter } from 'next/router';
import VacantImage from 'public/solidwhite.png';
import React from 'react';
import { departCrew, departCrewVariables } from 'src/__generated__/departCrew';
import {
  getCrewByName,
  getCrewByNameVariables,
} from 'src/__generated__/getCrewByName';
import { joinCrew, joinCrewVariables } from 'src/__generated__/joinCrew';
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

const JOIN_CREW = gql`
  mutation joinCrew($input: JoinCrewInput!) {
    joinCrew(input: $input) {
      ok
      error
    }
  }
`;

const DEPART_CREW = gql`
  mutation departCrew($input: DepartCrewInput!) {
    departCrew(input: $input) {
      ok
      error
    }
  }
`;

const Crew = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error, refetch } = useQuery<
    getCrewByName,
    getCrewByNameVariables
  >(GET_CREW_BY_NAME, {
    variables: {
      input: {
        name: id + '',
      },
    },
  });

  const onCompletedJoinCrew = (data: joinCrew) => {
    if (data.joinCrew.ok) {
      window.alert('크루 가입이 완료되었습니다 :)');
      refetch();
      return;
    }

    if (data.joinCrew.error) {
      alert('에러가 발생했습니다.');
    }
  };

  const onCompletedDepartCrew = (data: departCrew) => {
    if (data.departCrew.ok) {
      window.alert('크루 탈퇴가 완료되었습니다 :)');
      refetch();
    }

    if (data.departCrew.error) {
      alert('에러가 발생했습니다.');
    }
  };

  const [joinCrewMutation] = useMutation<joinCrew, joinCrewVariables>(
    JOIN_CREW,
    {
      onCompleted: onCompletedJoinCrew,
    }
  );

  const [departCrewMutation] = useMutation<departCrew, departCrewVariables>(
    DEPART_CREW,
    {
      onCompleted: onCompletedDepartCrew,
    }
  );

  const isJoined = data?.getCrewByName.users
    .map((el) => el.id)
    .includes(userInfoVar().id);

  const doJoin = () => {
    joinCrewMutation({
      variables: {
        input: {
          crewName: data?.getCrewByName.crew.name,
        },
      },
    });
  };

  const doDepart = () => {
    departCrewMutation({
      variables: {
        input: {
          crewName: data?.getCrewByName.crew.name,
        },
      },
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={CrewPageStyle.container}>
      <CrewProfile
        name={data?.getCrewByName.crew?.name}
        backgroundImg={data?.getCrewByName.crew?.backgroundImg || VacantImage}
        profileImg={data?.getCrewByName.crew?.profileImg || VacantImage}
        isJoined={isJoined}
        doJoin={doJoin}
        doDepart={doDepart}
      />
      <CrewJoinedPeople users={data?.getCrewByName.users} />
      <CrewNotice crewId={data?.getCrewByName.crew.id} />
      <CrewOOTD
        crewId={data?.getCrewByName.crew.id}
        users={data?.getCrewByName.users}
      />
    </div>
  );
};

export default Crew;

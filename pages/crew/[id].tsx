import { gql, useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { modalVisibleVar, userInfoVar } from 'cache/common/common.cache';
import CrewIntroduction from 'components/crew/CrewIntorduction';
import CrewJoinedPeople from 'components/crew/CrewJoinedPeople';
import CrewManagePeopleModal from 'components/crew/CrewManagePeopleModal';
import CrewNotice from 'components/crew/CrewNotice';
import CrewOOTD from 'components/crew/CrewOOTD';
import CrewProfile from 'components/crew/CrewProfile';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
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
        introduction
        backgroundImg
        link {
          type
          href
        }
      }
      users {
        grade
        user {
          id
          nickname
          profileImg
          link
        }
      }
      manager {
        id
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
  const visible = useReactiveVar(modalVisibleVar);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { data, loading, error, refetch } = useQuery<
    getCrewByName,
    getCrewByNameVariables
  >(GET_CREW_BY_NAME, {
    variables: {
      input: {
        name: id as string,
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
    ?.map((el) => el.user.id)
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

  if (!data) return <div>Error</div>;

  return (
    <div className={CrewPageStyle.container}>
      <CrewProfile
        refetch={refetch}
        data={data?.getCrewByName?.crew}
        managerId={data?.getCrewByName?.manager?.id}
        isJoined={isJoined}
        doJoin={doJoin}
        doDepart={doDepart}
      />
      <CrewIntroduction
        introduction={data?.getCrewByName?.crew?.introduction}
      />
      <CrewJoinedPeople
        users={data?.getCrewByName?.users}
        managerId={data?.getCrewByName?.manager?.id}
      />
      <CrewNotice crewId={data?.getCrewByName?.crew?.id} />
      <CrewOOTD
        crewId={data?.getCrewByName?.crew?.id}
        users={data?.getCrewByName?.users}
      />
      <CrewManagePeopleModal
        refetch={refetch}
        crewName={data?.getCrewByName?.crew?.name}
        users={data?.getCrewByName?.users}
        isVisible={visible.isVisibleCrewUserManageModal}
      />
    </div>
  );
};

export default Crew;

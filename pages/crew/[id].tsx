import CrewIntroduction from 'components/crew/CrewIntorduction';
import CrewJoinedPeople from 'components/crew/CrewJoinedPeople';
import CrewManagePeopleModal from 'components/crew/CrewManagePeopleModal';
import CrewNotice from 'components/crew/CrewNotice';
import CrewOOTD from 'components/crew/CrewOOTD';
import CrewProfile from 'components/crew/CrewProfile';
import useEachCrew from 'hooks/pages/crew/useEachCrew';
import React from 'react';
import CrewPageStyle from 'styles/crew/CrewPage.module.scss';

const Crew = () => {
  const { state, actions } = useEachCrew();
  const { data, loading, error, visible, isJoined, isManager } = state;
  const { refetch, doDepart, doJoin } = actions;

  if (loading) return <div>Loading...</div>;

  if (!data || error) return <div>Error</div>;

  return (
    <>
      <title>The Folks | Crew</title>
      <div className={CrewPageStyle.container}>
        <CrewProfile
          data={data?.getCrewByName?.crew}
          isManager={isManager}
          isJoined={isJoined}
          refetch={refetch}
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
    </>
  );
};

export default Crew;

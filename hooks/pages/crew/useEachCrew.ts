import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { modalVisibleVar, userInfoVar } from 'cache/common/common.cache';
import { DEPART_CREW, JOIN_CREW } from 'graphql/crew/mutations';
import { GET_CREW_BY_NAME } from 'graphql/crew/queries';
import { useRouter } from 'next/router';
import { departCrew, departCrewVariables } from 'src/__generated__/departCrew';
import {
  getCrewByName,
  getCrewByNameVariables,
} from 'src/__generated__/getCrewByName';
import { joinCrew, joinCrewVariables } from 'src/__generated__/joinCrew';

const useEachCrew = () => {
  const router = useRouter();
  const { id } = router.query;
  const visible = useReactiveVar(modalVisibleVar);
  const userInfo = useReactiveVar(userInfoVar);

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

  const isManager = data?.getCrewByName?.manager?.id === userInfo.id;

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
    .includes(userInfo.id);

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

  return {
    state: { data, loading, error, isJoined, visible, isManager },
    actions: { refetch, doJoin, doDepart },
  };
};

export default useEachCrew;

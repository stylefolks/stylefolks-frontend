import { ApolloQueryResult, useMutation } from '@apollo/client';
import { modalVisibleVar, userInfoVar } from 'cache/common/common.cache';
import { Button } from 'components/common/button/Button';
import CircleProfileImage from 'components/common/CircleProfileImage';
import BackDrop from 'components/common/shared/BackDrop';
import PageChange from 'components/pageChange/PageChange';
import gql from 'graphql-tag';
import Modal from 'HOC/Modal';
import React from 'react';
import {
  changeCrewUserGrade,
  changeCrewUserGradeVariables,
} from 'src/__generated__/changeCrewUserGrade';
import {
  getCrewByName,
  getCrewByNameVariables,
  getCrewByName_getCrewByName_users,
} from 'src/__generated__/getCrewByName';
import { CrewUserGrade } from 'src/__generated__/globalTypes';
import UtilStyle from 'styles/common/Util.module.scss';
import CrewPageStyle from 'styles/crew/CrewPage.module.scss';

const CHANGE_CREW_USER_GRADE = gql`
  mutation changeCrewUserGrade($input: ChangeCrewUserGradeInput!) {
    changeCrewUserGrade(input: $input) {
      ok
      error
    }
  }
`;

interface IProps {
  crewName: string;
  isVisible: boolean;
  users: getCrewByName_getCrewByName_users[];
  refetch: (
    variables?: Partial<getCrewByNameVariables>
  ) => Promise<ApolloQueryResult<getCrewByName>>;
}

const CrewManagePeopleModal: React.FC<IProps> = ({
  users,
  isVisible,
  refetch,
  crewName,
}) => {
  // const visibleVar = useReactiveVar(modalVisibleVar);
  const onCompleted = (data: changeCrewUserGrade) => {
    if (data.changeCrewUserGrade.ok) {
      window.alert('등급 변경이 완료되었습니다!');
      refetch();
    }
    if (data.changeCrewUserGrade.error) {
      window.alert('에러가 발생했습니다');
    }
  };

  const [changeCrewUserGradeMutation, { data, loading, error }] = useMutation<
    changeCrewUserGrade,
    changeCrewUserGradeVariables
  >(CHANGE_CREW_USER_GRADE, { onCompleted });

  const handleCrewUserGrade = ({
    nickname,
    pickGrade,
  }: {
    nickname: string;
    pickGrade: CrewUserGrade;
  }) => {
    changeCrewUserGradeMutation({
      variables: {
        input: {
          changeGrade:
            pickGrade === CrewUserGrade.CrewUser
              ? CrewUserGrade.CrewManager
              : CrewUserGrade.CrewUser,
          crewName,
          nickname,
        },
      },
    });
  };

  if (loading) return <PageChange />;

  return (
    <Modal visible={isVisible}>
      <BackDrop>
        <section className={CrewPageStyle.crewManagePeopleModalContainer}>
          <h2>Manage Crew People</h2>
          {/* <div>
            <label htmlFor="searchCrewPeople">Search</label>
            <input
              name="searchCrewPeople"
              value="검색할껴"
              onChange={(e) => console.log(e)}
            />
          </div> */}
          <ul>
            {users &&
              users
                .filter((el) => el.user.id !== userInfoVar().id)
                ?.map((el) => (
                  <li key={el.user.id}>
                    <div>
                      <CircleProfileImage profileImg={el.user.profileImg} />
                      <span>{el.user.nickname}</span>
                      <span>{el.grade}</span>
                    </div>
                    <Button
                      actionText={
                        el.grade === CrewUserGrade.CrewUser
                          ? '매니저로 변경'
                          : '유저로 변경'
                      }
                      loading={false}
                      canClick
                      onClick={() =>
                        handleCrewUserGrade({
                          pickGrade: el.grade,
                          nickname: el.user.nickname,
                        })
                      }
                    />
                  </li>
                ))}
          </ul>
          <div className={UtilStyle.modalButtonWrapper}>
            <Button
              actionText="Close"
              loading={false}
              canClick
              onClick={() =>
                modalVisibleVar({
                  ...modalVisibleVar(),
                  isVisibleCrewUserManageModal: false,
                })
              }
            />
          </div>
        </section>
      </BackDrop>
    </Modal>
  );
};

export default CrewManagePeopleModal;

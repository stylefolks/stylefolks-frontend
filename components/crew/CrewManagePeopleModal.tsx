import { userInfoVar } from 'cache/common/common.cache';
import BackDrop from 'components/common/BackDrop';
import { Button } from 'components/common/Button';
import CircleProfileImage from 'components/common/CircleProfileImage';
import Modal from 'HOC/Modal';
import React from 'react';
import { getCrewByName_getCrewByName_users } from 'src/__generated__/getCrewByName';
import { CrewUserGrade } from 'src/__generated__/globalTypes';
import UtilStyle from 'styles/common/Util.module.scss';
import CrewPageStyle from 'styles/crew/CrewPage.module.scss';

interface IProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  users: getCrewByName_getCrewByName_users[];
}

const CrewManagePeopleModal: React.FC<IProps> = ({
  users,
  isVisible,
  setIsVisible,
}) => {
  console.log(users);

  return (
    <Modal visible={isVisible}>
      <BackDrop>
        <section className={CrewPageStyle.crewManagePeopleModalContainer}>
          <h2>Manage Crew People</h2>
          <div>
            <label htmlFor="searchCrewPeople">Search</label>
            <input
              name="searchCrewPeople"
              value="검색할껴"
              onChange={(e) => console.log(e)}
            />
          </div>
          <ul>
            {users
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
                    onClick={() => setIsVisible((prev) => !prev)}
                  />
                </li>
              ))}
          </ul>
          <div className={UtilStyle.modalButtonWrapper}>
            <Button
              actionText="Close"
              loading={false}
              canClick
              onClick={() => setIsVisible((prev) => !prev)}
            />
          </div>
        </section>
      </BackDrop>
    </Modal>
  );
};

export default CrewManagePeopleModal;

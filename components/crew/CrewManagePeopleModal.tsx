import BackDrop from 'components/common/BackDrop';
import { Button } from 'components/common/Button';
import SmallCircleProfile from 'components/common/SmallCircleProfile';
import Modal from 'HOC/Modal';
import React from 'react';
import { getCrewByName_getCrewByName_users } from 'src/__generated__/getCrewByName';
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
  return (
    <Modal visible={isVisible}>
      <BackDrop>
        <section className={CrewPageStyle.crewManagePeopleModalContainer}>
          <ul>
            {users?.map((el) => (
              <SmallCircleProfile
                link={`/user/${el.nickname}`}
                key={el.id}
                name={el.nickname}
                profileImg={el.profileImg}
              />
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

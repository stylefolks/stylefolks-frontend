import { ApolloQueryResult, useMutation } from '@apollo/client';
import BackDrop from 'components/common/BackDrop';
import { Button } from 'components/common/Button';
import gql from 'graphql-tag';
import Modal from 'HOC/Modal';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  getCrewByName,
  getCrewByNameVariables,
  getCrewByName_getCrewByName_crew,
  getCrewByName_getCrewByName_crew_link,
} from 'src/__generated__/getCrewByName';
import { CrewLinkType } from 'src/__generated__/globalTypes';
import { modifyCrew, modifyCrewVariables } from 'src/__generated__/modifyCrew';
import UtilStyle from 'styles/common/Util.module.scss';
import CrewModifyImageInfo from './CrewModifyImageInfo';
import CrewModifyTextInfo from './CrewModifyTextInfo';

interface ICrewModifyModalProps {
  visible: boolean;
  onQuit: () => void;
  refetch: (
    variables?: Partial<getCrewByNameVariables>
  ) => Promise<ApolloQueryResult<getCrewByName>>;
  data: getCrewByName_getCrewByName_crew;
}

export interface ICrewInfo {
  name: string;
  link: getCrewByName_getCrewByName_crew_link[];
  introduction: string;
}

const MODIFY_CREW = gql`
  mutation modifyCrew($input: ModifyCrewInput!) {
    modifyCrew(input: $input) {
      ok
      error
    }
  }
`;

const CrewModifyModal: React.FC<ICrewModifyModalProps> = ({
  visible,
  onQuit,
  data,
  refetch,
}) => {
  const router = useRouter();
  const [isImageChange, setIsImageChange] = useState<boolean>(false);
  const [crewInfo, setCrewInfo] = useState<ICrewInfo>({
    name: '',
    link: [],
    introduction: '',
  });
  const onSave = () => {
    modifyCrewMutation({
      variables: {
        input: {
          crewName: data.name,
          name: crewInfo.name,
          link: crewInfo.link.map(({ __typename, ...input }) => input),
          introduction: crewInfo.introduction,
        },
      },
    });
  };

  const onCompletedModifyCrew = (data: modifyCrew) => {
    if (data.modifyCrew.ok) {
      window.alert('크루 수정이 완료되었습니다.');
      onQuit();
      refetch();
      router.push(`/crew/${crewInfo.name}`);
    }
    if (data.modifyCrew.error) {
      console.log(data.modifyCrew.error);
      window.alert('크루 수정 에러가 발생했습니다.');
    }
  };

  const [modifyCrewMutation] = useMutation<modifyCrew, modifyCrewVariables>(
    MODIFY_CREW,
    {
      onCompleted: onCompletedModifyCrew,
    }
  );

  useEffect(() => {
    if (data) {
      const { name, link, introduction } = data;

      setCrewInfo({
        name: name ? name : '',
        link,
        introduction: introduction ? introduction : '',
      });
    }
    () => {
      setCrewInfo({
        name: '',
        link: [],
        introduction: '',
      });
    };
  }, [data]);

  const handleLinkOnChange = (type: CrewLinkType, href: string): void => {
    setCrewInfo({
      ...crewInfo,
      link: [...crewInfo.link].map((el) => {
        if (el.type === type) {
          return {
            ...el,
            __typename: 'CrewLinkOption',
            href,
          };
        } else {
          return el;
        }
      }),
    });
  };

  return (
    <Modal visible={visible}>
      <BackDrop>
        <section className={UtilStyle.modalContainer}>
          <h2>Change Crew Detail</h2>
          {isImageChange ? (
            <CrewModifyImageInfo
              crewBackgroundImage={data?.backgroundImg}
              crewProfileImage={data?.profileImg}
            />
          ) : (
            <CrewModifyTextInfo
              crewInfo={crewInfo}
              handleLinkOnChange={handleLinkOnChange}
              setCrewInfo={setCrewInfo}
            />
          )}

          <div className={UtilStyle.modalButtonWrapper}>
            <div>
              <Button
                actionText={
                  isImageChange ? 'Back To Text Change' : 'Change Image'
                }
                onClick={() => setIsImageChange((prev) => !prev)}
                loading={false}
                canClick
              />
            </div>
            {isImageChange ? (
              ''
            ) : (
              <div>
                <Button
                  actionText="SAVE"
                  onClick={onSave}
                  loading={false}
                  canClick
                />
                <Button
                  actionText="QUIT"
                  onClick={onQuit}
                  loading={false}
                  canClick
                />
              </div>
            )}
          </div>
        </section>
      </BackDrop>
    </Modal>
  );
};

export default CrewModifyModal;

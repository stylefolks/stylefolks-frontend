import { ApolloQueryResult, useMutation } from '@apollo/client';
import BackDrop from 'components/common/BackDrop';
import { Button } from 'components/common/Button';
import gql from 'graphql-tag';
import Modal from 'HOC/Modal';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  getCrewByName,
  getCrewByNameVariables,
  getCrewByName_getCrewByName_crew,
  getCrewByName_getCrewByName_crew_link,
} from 'src/__generated__/getCrewByName';
import { CrewLinkType } from 'src/__generated__/globalTypes';
import { modifyCrew, modifyCrewVariables } from 'src/__generated__/modifyCrew';
import UtilStyle from 'styles/common/Util.module.scss';

interface ICrewModifyModalProps {
  visible: boolean;
  onQuit: () => void;
  refetch: (
    variables?: Partial<getCrewByNameVariables>
  ) => Promise<ApolloQueryResult<getCrewByName>>;
  data: getCrewByName_getCrewByName_crew;
}

interface ICrewInfo {
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
      console.log('came from props', link);

      setCrewInfo({
        name,
        link,
        introduction,
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

  const handleLinkOnChange = (type: CrewLinkType, href: string) => {
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
    //1.type통해서 배열내의 해당 객체 찾기
    //2. 스프레드 연산자로 해당객체만 셋 스테이팅 하기
  };

  useEffect(() => {
    console.log('in useEffect', crewInfo.link);
  }, [crewInfo]);

  return (
    <Modal visible={visible}>
      <BackDrop>
        <section className={UtilStyle.modalContainer}>
          <h2>Change Crew Detail</h2>
          <div className={UtilStyle.modalInputWrapper}>
            <label htmlFor="crewName">Name</label>
            <input
              value={crewInfo.name}
              onChange={(e) =>
                setCrewInfo({ ...crewInfo, name: e.target.value })
              }
              placeholder="Hello Crew"
              name="crewName"
              type="text"
              className={UtilStyle.input}
            />
            <label htmlFor="introduction">Introduction</label>
            <input
              value={crewInfo.introduction}
              onChange={(e) =>
                setCrewInfo({ ...crewInfo, introduction: e.target.value })
              }
              placeholder="Crew for new folks"
              name="Introduction"
              type="text"
              className={UtilStyle.input}
            />
            <h4>Link List</h4>
            {crewInfo.link.map((el) => (
              <>
                <label htmlFor={el.type}>{el.type}</label>
                <input
                  value={el.href}
                  type="text"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleLinkOnChange(el.type, e.target.value)
                  }
                />
              </>
            ))}
          </div>
          <div className={UtilStyle.modalButtonWrapper}>
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
        </section>
      </BackDrop>
    </Modal>
  );
};

export default CrewModifyModal;

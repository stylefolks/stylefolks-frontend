import React, { ChangeEvent } from 'react';
import { CrewLinkType } from 'src/__generated__/globalTypes';
import UtilStyle from 'styles/common/Util.module.scss';
import { ICrewInfo } from './CrewModifyModal';

interface ICrewModifyTextInfoProps {
  handleLinkOnChange: (type: CrewLinkType, href: string) => void;
  setCrewInfo: (value: React.SetStateAction<ICrewInfo>) => void;
  crewInfo: ICrewInfo;
}

const CrewModifyTextInfo: React.FC<ICrewModifyTextInfoProps> = ({
  crewInfo,
  handleLinkOnChange,
  setCrewInfo,
}) => {
  return (
    <div className={UtilStyle.modalInputWrapper}>
      <label htmlFor="crewName">Name</label>
      <input
        value={crewInfo.name}
        onChange={(e) => setCrewInfo({ ...crewInfo, name: e.target.value })}
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
        <React.Fragment key={el.type}>
          <label htmlFor={el.type}>{el.type}</label>
          <input
            value={el.href}
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleLinkOnChange(el.type, e.target.value)
            }
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default CrewModifyTextInfo;

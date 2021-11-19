import React from 'react';
import CrewPageStyle from 'styles/crew/CrewPage.module.scss';

interface ICrewIntroducntion {
  introduction: string | null;
}

const CrewIntroduction: React.FC<ICrewIntroducntion> = ({ introduction }) => {
  return (
    <div className={CrewPageStyle.crewIntroductionContainer}>
      <h4>Introducntion</h4>
      <span>Hello</span>
      <span>{introduction ? introduction : ''}</span>
    </div>
  );
};
export default CrewIntroduction;

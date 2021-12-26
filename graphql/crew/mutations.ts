import { gql } from '@apollo/client';

export const JOIN_CREW = gql`
  mutation joinCrew($input: JoinCrewInput!) {
    joinCrew(input: $input) {
      ok
      error
    }
  }
`;

export const DEPART_CREW = gql`
  mutation departCrew($input: DepartCrewInput!) {
    departCrew(input: $input) {
      ok
      error
    }
  }
`;

export const CHANGE_CREW_USER_GRADE = gql`
  mutation changeCrewUserGrade($input: ChangeCrewUserGradeInput!) {
    changeCrewUserGrade(input: $input) {
      ok
      error
    }
  }
`;

export const MODIFY_CREW = gql`
  mutation modifyCrew($input: ModifyCrewInput!) {
    modifyCrew(input: $input) {
      ok
      error
    }
  }
`;

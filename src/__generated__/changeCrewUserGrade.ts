/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


import { ChangeCrewUserGradeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: changeCrewUserGrade
// ====================================================


export interface changeCrewUserGrade_changeCrewUserGrade {
  __typename: "ChangeCrewUserGradeOutput";
  ok: boolean;
  error: string | null;
}

export interface changeCrewUserGrade {
  changeCrewUserGrade: changeCrewUserGrade_changeCrewUserGrade;
}

export interface changeCrewUserGradeVariables {
  input: ChangeCrewUserGradeInput;
}

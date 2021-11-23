/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


import { JoinCrewInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: joinCrew
// ====================================================


export interface joinCrew_joinCrew {
  __typename: "JoinCrewOutput";
  ok: boolean;
  error: string | null;
}

export interface joinCrew {
  joinCrew: joinCrew_joinCrew;
}

export interface joinCrewVariables {
  input: JoinCrewInput;
}

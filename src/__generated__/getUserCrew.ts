/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


// ====================================================
// GraphQL query operation: getUserCrew
// ====================================================


export interface getUserCrew_getUserCrew_crews {
  __typename: "Crew";
  name: string;
  id: number;
  profileImg: string | null;
}

export interface getUserCrew_getUserCrew {
  __typename: "GetUserCrewOutput";
  ok: boolean;
  error: string | null;
  crews: getUserCrew_getUserCrew_crews[] | null;
}

export interface getUserCrew {
  getUserCrew: getUserCrew_getUserCrew;
}

export interface getUserCrewVariables {
  nickname: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


import { GetCrewByNameInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getCrewByName
// ====================================================


export interface getCrewByName_getCrewByName_crew {
  __typename: "Crew";
  profileImg: string | null;
  name: string;
  Introduction: string;
  backgroundImg: string;
}

export interface getCrewByName_getCrewByName_users {
  __typename: "User";
  nickname: string;
}

export interface getCrewByName_getCrewByName {
  __typename: "GetCrewByNameOutput";
  ok: boolean;
  error: string | null;
  crew: getCrewByName_getCrewByName_crew | null;
  users: getCrewByName_getCrewByName_users[] | null;
}

export interface getCrewByName {
  getCrewByName: getCrewByName_getCrewByName;
}

export interface getCrewByNameVariables {
  input: GetCrewByNameInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetCrewByNameInput, CrewLinkType, CrewUserGrade } from "./globalTypes";

// ====================================================
// GraphQL query operation: getCrewByName
// ====================================================

export interface getCrewByName_getCrewByName_crew_link {
  __typename: "CrewLinkOption";
  type: CrewLinkType;
  href: string | null;
}

export interface getCrewByName_getCrewByName_crew {
  __typename: "Crew";
  id: number;
  profileImg: string | null;
  name: string;
  introduction: string | null;
  backgroundImg: string | null;
  link: getCrewByName_getCrewByName_crew_link[];
}

export interface getCrewByName_getCrewByName_users_user {
  __typename: "User";
  id: number;
  nickname: string;
  profileImg: string | null;
  link: string | null;
}

export interface getCrewByName_getCrewByName_users {
  __typename: "CrewUsers";
  grade: CrewUserGrade;
  user: getCrewByName_getCrewByName_users_user | null;
}

export interface getCrewByName_getCrewByName_manager {
  __typename: "User";
  id: number;
}

export interface getCrewByName_getCrewByName {
  __typename: "GetCrewByNameOutput";
  ok: boolean;
  error: string | null;
  crew: getCrewByName_getCrewByName_crew | null;
  users: getCrewByName_getCrewByName_users[] | null;
  manager: getCrewByName_getCrewByName_manager | null;
}

export interface getCrewByName {
  getCrewByName: getCrewByName_getCrewByName;
}

export interface getCrewByNameVariables {
  input: GetCrewByNameInput;
}

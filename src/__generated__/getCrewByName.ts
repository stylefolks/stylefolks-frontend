/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


import { GetCrewByNameInput, CrewUserGrade } from "./globalTypes";

// ====================================================
// GraphQL query operation: getCrewByName
// ====================================================


export interface getCrewByName_getCrewByName_crew {
  __typename: "Crew";
  id: number;
  profileImg: string | null;
  name: string;
  Introduction: string | null;
  backgroundImg: string | null;
}

export interface getCrewByName_getCrewByName_users_crewUser {
  __typename: "CrewUsers";
  grade: CrewUserGrade;
}

export interface getCrewByName_getCrewByName_users {
  __typename: "User";
  id: number;
  nickname: string;
  profileImg: string | null;
  crewUser: getCrewByName_getCrewByName_users_crewUser;
}

export interface getCrewByName_getCrewByName_posts_user {
  __typename: "User";
  nickname: string;
  profileImg: string | null;
}

export interface getCrewByName_getCrewByName_posts {
  __typename: "Posts";
  titleImg: string | null;
  title: string;
  id: number;
  createdAt: any;
  viewCount: number;
  user: getCrewByName_getCrewByName_posts_user;
}

export interface getCrewByName_getCrewByName {
  __typename: "GetCrewByNameOutput";
  ok: boolean;
  error: string | null;
  crew: getCrewByName_getCrewByName_crew | null;
  users: getCrewByName_getCrewByName_users[] | null;
  posts: getCrewByName_getCrewByName_posts[] | null;
}

export interface getCrewByName {
  getCrewByName: getCrewByName_getCrewByName;
}

export interface getCrewByNameVariables {
  input: GetCrewByNameInput;
}

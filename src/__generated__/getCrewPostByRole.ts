/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


import { GetCrewPostByRoleInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getCrewPostByRole
// ====================================================


export interface getCrewPostByRole_getCrewPostByRole_posts_user {
  __typename: "User";
  id: number;
  nickname: string;
}

export interface getCrewPostByRole_getCrewPostByRole_posts {
  __typename: "Posts";
  title: string;
  titleImg: string | null;
  id: number;
  viewCount: number;
  user: getCrewPostByRole_getCrewPostByRole_posts_user;
}

export interface getCrewPostByRole_getCrewPostByRole {
  __typename: "GetCrewPostByRoleOutput";
  ok: boolean;
  error: string | null;
  posts: getCrewPostByRole_getCrewPostByRole_posts[] | null;
}

export interface getCrewPostByRole {
  getCrewPostByRole: getCrewPostByRole_getCrewPostByRole;
}

export interface getCrewPostByRoleVariables {
  input: GetCrewPostByRoleInput;
}

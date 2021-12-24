/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: findByNickName
// ====================================================

export interface findByNickName_findByNickName_crews {
  __typename: "Crew";
  name: string;
  id: number;
  profileImg: string | null;
}

export interface findByNickName_findByNickName_user {
  __typename: "User";
  id: number;
  nickname: string;
  email: string;
  link: string | null;
  role: UserRole;
  profileImg: string | null;
}

export interface findByNickName_findByNickName {
  __typename: "FindByNicknameOutput";
  ok: boolean;
  error: string | null;
  crews: findByNickName_findByNickName_crews[] | null;
  user: findByNickName_findByNickName_user | null;
}

export interface findByNickName {
  findByNickName: findByNickName_findByNickName;
}

export interface findByNickNameVariables {
  nickname: string;
}

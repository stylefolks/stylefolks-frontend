/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: findById
// ====================================================


export interface findById_findById_user {
  __typename: "User";
  id: number;
  nickname: string;
  email: string;
  role: UserRole;
  profileImg: string | null;
}

export interface findById_findById {
  __typename: "FindByIdOutput";
  ok: boolean;
  error: string | null;
  user: findById_findById_user | null;
}

export interface findById {
  findById: findById_findById;
}

export interface findByIdVariables {
  userId: number;
}

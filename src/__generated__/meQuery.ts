/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: meQuery
// ====================================================


export interface meQuery_me {
  __typename: "User";
  id: number;
  nickname: string;
  email: string;
  role: UserRole;
  verified: boolean;
  profileImg: string | null;
  link: string | null;
}

export interface meQuery {
  me: meQuery_me;
}

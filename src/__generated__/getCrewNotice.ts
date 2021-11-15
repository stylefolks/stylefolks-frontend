/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


import { GetCrewNoticeInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getCrewNotice
// ====================================================


export interface getCrewNotice_getCrewNotice_posts {
  __typename: "Posts";
  title: string;
  id: number;
}

export interface getCrewNotice_getCrewNotice {
  __typename: "GetrCrewNoticeOutput";
  ok: boolean;
  error: string | null;
  posts: getCrewNotice_getCrewNotice_posts[] | null;
}

export interface getCrewNotice {
  getCrewNotice: getCrewNotice_getCrewNotice;
}

export interface getCrewNoticeVariables {
  input: GetCrewNoticeInput;
}

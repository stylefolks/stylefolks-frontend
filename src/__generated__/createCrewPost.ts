/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCrewPostInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createCrewPost
// ====================================================

export interface createCrewPost_createCrewPost {
  __typename: "CreateCrewPostOutput";
  ok: boolean;
  error: string | null;
}

export interface createCrewPost {
  createCrewPost: createCrewPost_createCrewPost;
}

export interface createCrewPostVariables {
  input: CreateCrewPostInput;
}

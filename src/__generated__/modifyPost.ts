/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ModifyMyPostInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: modifyPost
// ====================================================

export interface modifyPost_modifyPost {
  __typename: "ModifyMyPostOutput";
  ok: boolean;
  error: string | null;
}

export interface modifyPost {
  modifyPost: modifyPost_modifyPost;
}

export interface modifyPostVariables {
  input: ModifyMyPostInput;
}

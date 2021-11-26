/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ModifyCommentInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: modifyComment
// ====================================================

export interface modifyComment_modifyComment {
  __typename: "ModifyCommentOutput";
  ok: boolean;
  error: string | null;
}

export interface modifyComment {
  modifyComment: modifyComment_modifyComment;
}

export interface modifyCommentVariables {
  input: ModifyCommentInput;
}

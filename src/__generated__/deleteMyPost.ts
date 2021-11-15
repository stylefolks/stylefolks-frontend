/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


// ====================================================
// GraphQL mutation operation: deleteMyPost
// ====================================================


export interface deleteMyPost_deleteMyPost {
  __typename: "DeletePostOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteMyPost {
  deleteMyPost: deleteMyPost_deleteMyPost;
}

export interface deleteMyPostVariables {
  postId: number;
}

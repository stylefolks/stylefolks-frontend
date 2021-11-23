/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


// ====================================================
// GraphQL query operation: getEachPostComments
// ====================================================


export interface getEachPostComments_getEachPostComments_comments_user {
  __typename: "User";
  id: number;
  nickname: string;
  profileImg: string | null;
}

export interface getEachPostComments_getEachPostComments_comments {
  __typename: "Comments";
  comment: string;
  id: number;
  user: getEachPostComments_getEachPostComments_comments_user;
}

export interface getEachPostComments_getEachPostComments {
  __typename: "GetEachPostCommentsOutput";
  comments: getEachPostComments_getEachPostComments_comments[] | null;
  ok: boolean;
  error: string | null;
}

export interface getEachPostComments {
  getEachPostComments: getEachPostComments_getEachPostComments;
}

export interface getEachPostCommentsVariables {
  postsId: number;
}

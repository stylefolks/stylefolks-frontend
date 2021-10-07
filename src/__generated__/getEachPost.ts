/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getEachPost
// ====================================================

export interface getEachPost_getEachPost_post_user {
  __typename: "User";
  nickname: string;
  id: number;
}

export interface getEachPost_getEachPost_post {
  __typename: "Posts";
  title: string;
  titleImg: string | null;
  contents: string;
  user: getEachPost_getEachPost_post_user;
}

export interface getEachPost_getEachPost {
  __typename: "GetEachPostOutput";
  ok: boolean;
  error: string | null;
  post: getEachPost_getEachPost_post | null;
}

export interface getEachPost {
  getEachPost: getEachPost_getEachPost;
}

export interface getEachPostVariables {
  postId: number;
}

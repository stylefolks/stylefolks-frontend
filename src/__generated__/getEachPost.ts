/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SecondCategoryName } from "./globalTypes";

// ====================================================
// GraphQL query operation: getEachPost
// ====================================================

export interface getEachPost_getEachPost_post_firstCategory {
  __typename: "FirstCategory";
  name: string;
  id: number;
}

export interface getEachPost_getEachPost_post_secondCategory {
  __typename: "SecondCategory";
  name: SecondCategoryName | null;
  id: number;
}

export interface getEachPost_getEachPost_post_user {
  __typename: "User";
  nickname: string;
  id: number;
  profileImg: string;
}

export interface getEachPost_getEachPost_post_image {
  __typename: "Images";
  link: string;
  id: number;
}

export interface getEachPost_getEachPost_post {
  __typename: "Posts";
  title: string;
  titleImg: string | null;
  contents: string;
  firstCategory: getEachPost_getEachPost_post_firstCategory | null;
  secondCategory: getEachPost_getEachPost_post_secondCategory | null;
  user: getEachPost_getEachPost_post_user;
  image: getEachPost_getEachPost_post_image[];
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

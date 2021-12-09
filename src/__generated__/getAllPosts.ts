/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetAllPostsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getAllPosts
// ====================================================

export interface getAllPosts_getAllPosts_post_user {
  __typename: "User";
  id: number;
  nickname: string;
}

export interface getAllPosts_getAllPosts_post {
  __typename: "Posts";
  id: number;
  title: string;
  titleImg: string | null;
  user: getAllPosts_getAllPosts_post_user;
  viewCount: number;
}

export interface getAllPosts_getAllPosts {
  __typename: "GetAllPostsOutput";
  ok: boolean;
  error: string | null;
  post: getAllPosts_getAllPosts_post[] | null;
  totalPages: number | null;
  totalResults: number | null;
}

export interface getAllPosts {
  getAllPosts: getAllPosts_getAllPosts;
}

export interface getAllPostsVariables {
  input: GetAllPostsInput;
}

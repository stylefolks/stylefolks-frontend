/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPostForMainCategoryPageInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPostForMainCategoryPage
// ====================================================

export interface getPostForMainCategoryPage_getPostForMainCategoryPage_post_user {
  __typename: "User";
  nickname: string;
}

export interface getPostForMainCategoryPage_getPostForMainCategoryPage_post {
  __typename: "Posts";
  id: number;
  title: string;
  user: getPostForMainCategoryPage_getPostForMainCategoryPage_post_user;
}

export interface getPostForMainCategoryPage_getPostForMainCategoryPage {
  __typename: "GetPostForMainCategoryPageOutput";
  ok: boolean;
  error: string | null;
  post: getPostForMainCategoryPage_getPostForMainCategoryPage_post[] | null;
}

export interface getPostForMainCategoryPage {
  getPostForMainCategoryPage: getPostForMainCategoryPage_getPostForMainCategoryPage;
}

export interface getPostForMainCategoryPageVariables {
  input: GetPostForMainCategoryPageInput;
}

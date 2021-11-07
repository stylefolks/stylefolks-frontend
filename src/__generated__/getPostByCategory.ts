/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPostByCategoryInput, UserRole, FirstCategoryName, SecondCategoryName } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPostByCategory
// ====================================================

export interface getPostByCategory_getPostByCategory_post_user {
  __typename: "User";
  email: string;
  nickname: string;
  role: UserRole;
  profileImg: string | null;
}

export interface getPostByCategory_getPostByCategory_post {
  __typename: "Posts";
  id: number;
  createdAt: any;
  updatedAt: any;
  title: string;
  titleImg: string | null;
  viewCount: number;
  contents: string;
  user: getPostByCategory_getPostByCategory_post_user;
}

export interface getPostByCategory_getPostByCategory {
  __typename: "GetPostByCategoryOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  post: getPostByCategory_getPostByCategory_post[] | null;
  firstCategoryName: FirstCategoryName | null;
  secondCategoryName: SecondCategoryName | null;
}

export interface getPostByCategory {
  getPostByCategory: getPostByCategory_getPostByCategory;
}

export interface getPostByCategoryVariables {
  input: GetPostByCategoryInput;
}

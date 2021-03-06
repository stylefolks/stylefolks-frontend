/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPostByCategoryInput, UserRole, FirstCategoryName, SecondCategoryName } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPostByCategory
// ====================================================

export interface getPostByCategory_getPostByCategory_post_comments {
  __typename: "Comments";
  id: number;
}

export interface getPostByCategory_getPostByCategory_post_user {
  __typename: "User";
  id: number;
  nickname: string;
  profileImg: string | null;
  email: string;
  role: UserRole;
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
  comments: getPostByCategory_getPostByCategory_post_comments[];
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

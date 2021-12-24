/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SecondCategoryName } from "./globalTypes";

// ====================================================
// GraphQL query operation: getCategoryByUserRole
// ====================================================

export interface getCategoryByUserRole_getCategoryByUserRole_firstCategory_secondCategory {
  __typename: "SecondCategory";
  id: number;
  name: SecondCategoryName | null;
}

export interface getCategoryByUserRole_getCategoryByUserRole_firstCategory {
  __typename: "FirstCategory";
  name: string;
  id: number;
  secondCategory: getCategoryByUserRole_getCategoryByUserRole_firstCategory_secondCategory[];
}

export interface getCategoryByUserRole_getCategoryByUserRole_brands {
  __typename: "Brand";
  name: string;
  id: number;
}

export interface getCategoryByUserRole_getCategoryByUserRole_crews {
  __typename: "Crew";
  name: string;
  id: number;
}

export interface getCategoryByUserRole_getCategoryByUserRole_tempPosts_firstCategory {
  __typename: "FirstCategory";
  id: number;
  name: string;
}

export interface getCategoryByUserRole_getCategoryByUserRole_tempPosts_secondCategory {
  __typename: "SecondCategory";
  id: number;
  name: SecondCategoryName | null;
}

export interface getCategoryByUserRole_getCategoryByUserRole_tempPosts_image {
  __typename: "Images";
  link: string;
  id: number;
}

export interface getCategoryByUserRole_getCategoryByUserRole_tempPosts {
  __typename: "TempPost";
  id: number;
  title: string;
  titleImg: string | null;
  contents: string;
  firstCategory: getCategoryByUserRole_getCategoryByUserRole_tempPosts_firstCategory | null;
  secondCategory: getCategoryByUserRole_getCategoryByUserRole_tempPosts_secondCategory | null;
  image: getCategoryByUserRole_getCategoryByUserRole_tempPosts_image[];
}

export interface getCategoryByUserRole_getCategoryByUserRole {
  __typename: "GetCategoryByUserRoleOutput";
  ok: boolean;
  error: string | null;
  firstCategory: getCategoryByUserRole_getCategoryByUserRole_firstCategory[] | null;
  brands: getCategoryByUserRole_getCategoryByUserRole_brands[] | null;
  crews: getCategoryByUserRole_getCategoryByUserRole_crews[] | null;
  tempPosts: getCategoryByUserRole_getCategoryByUserRole_tempPosts[] | null;
}

export interface getCategoryByUserRole {
  getCategoryByUserRole: getCategoryByUserRole_getCategoryByUserRole;
}

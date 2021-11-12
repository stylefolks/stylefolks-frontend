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

export interface getCategoryByUserRole_getCategoryByUserRole {
  __typename: "GetCategoryByUserRoleOutput";
  ok: boolean;
  error: string | null;
  firstCategory: getCategoryByUserRole_getCategoryByUserRole_firstCategory[] | null;
  brands: getCategoryByUserRole_getCategoryByUserRole_brands[] | null;
  crews: getCategoryByUserRole_getCategoryByUserRole_crews[] | null;
}

export interface getCategoryByUserRole {
  getCategoryByUserRole: getCategoryByUserRole_getCategoryByUserRole;
}

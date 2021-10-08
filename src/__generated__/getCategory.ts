/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SecondCategoryName } from "./globalTypes";

// ====================================================
// GraphQL query operation: getCategory
// ====================================================

export interface getCategory_getCategory_categories_secondCategory {
  __typename: "SecondCategory";
  name: SecondCategoryName | null;
  id: number;
}

export interface getCategory_getCategory_categories {
  __typename: "FirstCategory";
  id: number;
  name: string;
  secondCategory: getCategory_getCategory_categories_secondCategory[];
}

export interface getCategory_getCategory {
  __typename: "GetCategoryOutput";
  ok: boolean;
  error: string | null;
  categories: getCategory_getCategory_categories[] | null;
}

export interface getCategory {
  getCategory: getCategory_getCategory;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetCategoryByFirstCategoryNameInput, SecondCategoryName } from "./globalTypes";

// ====================================================
// GraphQL query operation: getCategoryByFirstCategory
// ====================================================

export interface getCategoryByFirstCategory_getCategoryByFirstCategory_category_secondCategory {
  __typename: "SecondCategory";
  name: SecondCategoryName | null;
}

export interface getCategoryByFirstCategory_getCategoryByFirstCategory_category {
  __typename: "FirstCategory";
  name: string;
  secondCategory: getCategoryByFirstCategory_getCategoryByFirstCategory_category_secondCategory[];
}

export interface getCategoryByFirstCategory_getCategoryByFirstCategory {
  __typename: "GetCategoryByFirstCategoryNameOutput";
  ok: boolean;
  error: string | null;
  category: getCategoryByFirstCategory_getCategoryByFirstCategory_category | null;
}

export interface getCategoryByFirstCategory {
  getCategoryByFirstCategory: getCategoryByFirstCategory_getCategoryByFirstCategory;
}

export interface getCategoryByFirstCategoryVariables {
  input: GetCategoryByFirstCategoryNameInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


import { SecondCategoryName } from "./globalTypes";

// ====================================================
// GraphQL query operation: getUserTemp
// ====================================================


export interface getUserTemp_getUserTemp_temps_firstCategory {
  __typename: "FirstCategory";
  id: number;
  name: string;
}

export interface getUserTemp_getUserTemp_temps_secondCategory {
  __typename: "SecondCategory";
  id: number;
  name: SecondCategoryName | null;
}

export interface getUserTemp_getUserTemp_temps_image {
  __typename: "Images";
  link: string;
  id: number;
}

export interface getUserTemp_getUserTemp_temps {
  __typename: "TempPost";
  id: number;
  title: string;
  titleImg: string | null;
  contents: string;
  firstCategory: getUserTemp_getUserTemp_temps_firstCategory | null;
  secondCategory: getUserTemp_getUserTemp_temps_secondCategory | null;
  image: getUserTemp_getUserTemp_temps_image[];
}

export interface getUserTemp_getUserTemp {
  __typename: "GetUserTempByIdOutput";
  ok: boolean;
  error: string | null;
  temps: getUserTemp_getUserTemp_temps[] | null;
}

export interface getUserTemp {
  getUserTemp: getUserTemp_getUserTemp;
}

export interface getUserTempVariables {
  userId: number;
}

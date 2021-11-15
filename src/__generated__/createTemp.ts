/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


import { CreateTempInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createTemp
// ====================================================


export interface createTemp_createTemp {
  __typename: "CreateTempOutput";
  ok: boolean;
  error: string | null;
}

export interface createTemp {
  createTemp: createTemp_createTemp;
}

export interface createTempVariables {
  input: CreateTempInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindPasswordIntput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: findPassword
// ====================================================

export interface findPassword_findPassword {
  __typename: "FindPasswordOutput";
  ok: boolean;
  error: string | null;
}

export interface findPassword {
  findPassword: findPassword_findPassword;
}

export interface findPasswordVariables {
  input: FindPasswordIntput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChangePasswordInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: changePassword
// ====================================================

export interface changePassword_changePassword {
  __typename: "ChangePasswordOutput";
  ok: boolean;
  error: string | null;
}

export interface changePassword {
  changePassword: changePassword_changePassword;
}

export interface changePasswordVariables {
  input: ChangePasswordInput;
}

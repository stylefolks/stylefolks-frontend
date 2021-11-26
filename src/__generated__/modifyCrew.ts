/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ModifyCrewInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: modifyCrew
// ====================================================

export interface modifyCrew_modifyCrew {
  __typename: "ModifyCrewOutput";
  ok: boolean;
  error: string | null;
}

export interface modifyCrew {
  modifyCrew: modifyCrew_modifyCrew;
}

export interface modifyCrewVariables {
  input: ModifyCrewInput;
}

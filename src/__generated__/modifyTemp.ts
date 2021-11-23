/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


import { ModifyMyTemptInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: modifyTemp
// ====================================================


export interface modifyTemp_modifyTemp {
  __typename: "ModifyMyTempOutput";
  ok: boolean;
  error: string | null;
}

export interface modifyTemp {
  modifyTemp: modifyTemp_modifyTemp;
}

export interface modifyTempVariables {
  input: ModifyMyTemptInput;
}

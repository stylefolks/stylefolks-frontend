/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UploadTempInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: uploadTemp
// ====================================================

export interface uploadTemp_uploadTemp {
  __typename: "UploadTempOutput";
  ok: boolean;
  error: string | null;
}

export interface uploadTemp {
  uploadTemp: uploadTemp_uploadTemp;
}

export interface uploadTempVariables {
  input: UploadTempInput;
}

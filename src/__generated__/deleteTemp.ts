/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteTemp
// ====================================================

export interface deleteTemp_deleteTemp {
  __typename: "DeleteTempOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteTemp {
  deleteTemp: deleteTemp_deleteTemp;
}

export interface deleteTempVariables {
  postId: number;
}

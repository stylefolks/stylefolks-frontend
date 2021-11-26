/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DepartCrewInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: departCrew
// ====================================================

export interface departCrew_departCrew {
  __typename: "DepartCrewOutput";
  ok: boolean;
  error: string | null;
}

export interface departCrew {
  departCrew: departCrew_departCrew;
}

export interface departCrewVariables {
  input: DepartCrewInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetAllCrewInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getAllCrew
// ====================================================

export interface getAllCrew_getAllCrew_crew {
  __typename: "Crew";
  id: number;
  profileImg: string | null;
  name: string;
  introduction: string | null;
  backgroundImg: string | null;
  followerCount: number | null;
}

export interface getAllCrew_getAllCrew {
  __typename: "GetAllCrewOutput";
  ok: boolean;
  error: string | null;
  crew: getAllCrew_getAllCrew_crew[];
}

export interface getAllCrew {
  getAllCrew: getAllCrew_getAllCrew;
}

export interface getAllCrewVariables {
  input: GetAllCrewInput;
}

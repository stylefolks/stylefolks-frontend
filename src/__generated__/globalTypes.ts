/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum FirstCategoryName {
  COLUMN = "COLUMN",
  CREW = "CREW",
  FOLKS = "FOLKS",
  TALK = "TALK",
}

export enum SecondCategoryName {
  ARTICLE = "ARTICLE",
  BRAND = "BRAND",
  CHALLENGE = "CHALLENGE",
  FREE = "FREE",
  NOTICE = "NOTICE",
  OOTD = "OOTD",
  PUBLISHER = "PUBLISHER",
  REVIEW = "REVIEW",
  USER = "USER",
}

export enum UserRole {
  Brand = "Brand",
  Manager = "Manager",
  Master = "Master",
  Publisher = "Publisher",
  User = "User",
}

export interface CreateAccountInput {
  email: string;
  password: string;
  nickname: string;
  role: UserRole;
}

export interface CreatePostInput {
  title: string;
  contents: string;
  titleImg?: string | null;
  firstCategoryId: number;
  secondCategoryId?: number | null;
}

export interface CreateTempInput {
  title: string;
  contents: string;
  titleImg?: string | null;
  firstCategoryId: number;
  secondCategoryId?: number | null;
}

export interface GetPostForMainCategoryPageInput {
  firstCategoryName: FirstCategoryName;
  postCount?: number | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================

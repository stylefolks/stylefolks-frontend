/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum CrewLinkType {
  HOME = "HOME",
  INSTAGRAM = "INSTAGRAM",
  YOUTUBE = "YOUTUBE",
}

export enum CrewUserGrade {
  CrewManager = "CrewManager",
  CrewMaster = "CrewMaster",
  CrewUser = "CrewUser",
}

export enum FirstCategoryName {
  COLUMN = "COLUMN",
  CREW = "CREW",
  FOLKS = "FOLKS",
  TALK = "TALK",
}

export enum SecondCategoryName {
  BRAND_ARTICLE = "BRAND_ARTICLE",
  BRAND_COLUMN = "BRAND_COLUMN",
  BRAND_NOTICE = "BRAND_NOTICE",
  BRAND_REVIEW = "BRAND_REVIEW",
  CHALLENGE = "CHALLENGE",
  CREW_NOTICE = "CREW_NOTICE",
  FREE = "FREE",
  OOTD = "OOTD",
  PUBLISHER_COLUMN = "PUBLISHER_COLUMN",
  USER_COLUMN = "USER_COLUMN",
}

export enum UserRole {
  Brand = "Brand",
  Manager = "Manager",
  Master = "Master",
  Publisher = "Publisher",
  User = "User",
}

export interface ChangeCrewUserGradeInput {
  changeGrade: CrewUserGrade;
  nickname: string;
  crewName: string;
}

export interface ChangePasswordInput {
  password: string;
  changePassword: string;
}

export interface CreateAccountInput {
  email: string;
  password: string;
  nickname: string;
  role: UserRole;
}

export interface CreateCommentInput {
  postId: number;
  comment: string;
}

export interface CreatePostInput {
  title: string;
  contents: string;
  titleImg?: string | null;
  firstCategoryName: FirstCategoryName;
  secondCategoryName?: SecondCategoryName | null;
  crewId?: number | null;
  brandId?: number | null;
}

export interface CreateTempInput {
  title: string;
  contents: string;
  titleImg?: string | null;
  firstCategoryName: FirstCategoryName;
  secondCategoryName?: SecondCategoryName | null;
  crewId?: number | null;
  brandId?: number | null;
}

export interface CrewLinkOptionInputType {
  type: CrewLinkType;
  href?: string | null;
}

export interface DeleteCommentInput {
  postId: number;
  commentId: number;
}

export interface DepartCrewInput {
  crewName: string;
}

export interface EditProfileInput {
  nickname?: string | null;
  profileImg?: string | null;
  link?: string | null;
}

export interface GetAllCrewInput {
  page?: number | null;
  inputTake?: number | null;
}

export interface GetAllPostsInput {
  page?: number | null;
  inputTake?: number | null;
}

export interface GetCrewByNameInput {
  name: string;
}

export interface GetCrewNoticeInput {
  crewId: number;
}

export interface GetCrewPostByRoleInput {
  page?: number | null;
  inputTake?: number | null;
  crewId: number;
  grade: CrewUserGrade;
}

export interface GetPostByCategoryInput {
  page?: number | null;
  inputTake?: number | null;
  firstCategoryName: FirstCategoryName;
  secondCategoryName?: SecondCategoryName | null;
  userRole?: UserRole | null;
  brandId?: number | null;
  crewId?: number | null;
  nickname?: string | null;
}

export interface JoinCrewInput {
  crewName: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ModifyCommentInput {
  postId: number;
  comment: string;
  commentId: number;
}

export interface ModifyCrewInput {
  name?: string | null;
  link?: CrewLinkOptionInputType[] | null;
  profileImg?: string | null;
  backgroundImg?: string | null;
  introduction?: string | null;
  crewName: string;
}

export interface ModifyMyPostInput {
  title?: string | null;
  contents?: string | null;
  titleImg?: string | null;
  firstCategoryName?: FirstCategoryName | null;
  secondCategoryName?: SecondCategoryName | null;
  crewId?: number | null;
  brandId?: number | null;
  postId: number;
}

export interface ModifyMyTemptInput {
  title?: string | null;
  contents?: string | null;
  titleImg?: string | null;
  firstCategoryName?: FirstCategoryName | null;
  secondCategoryName?: SecondCategoryName | null;
  crewId?: number | null;
  brandId?: number | null;
  postId: number;
}

export interface UploadTempInput {
  title: string;
  contents: string;
  titleImg?: string | null;
  firstCategoryName: FirstCategoryName;
  secondCategoryName?: SecondCategoryName | null;
  crewId?: number | null;
  brandId?: number | null;
  tempId: number;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================

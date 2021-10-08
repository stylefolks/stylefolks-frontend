/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUserPost
// ====================================================

export interface getUserPost_getUserPost_posts_image {
  __typename: "Images";
  link: string;
  id: number;
}

export interface getUserPost_getUserPost_posts {
  __typename: "Posts";
  id: number;
  title: string;
  titleImg: string | null;
  contents: string;
  isUploaded: boolean;
  image: getUserPost_getUserPost_posts_image[];
}

export interface getUserPost_getUserPost {
  __typename: "GetUserPostByIdOutput";
  ok: boolean;
  error: string | null;
  posts: getUserPost_getUserPost_posts[] | null;
}

export interface getUserPost {
  getUserPost: getUserPost_getUserPost;
}

export interface getUserPostVariables {
  userId: number;
}

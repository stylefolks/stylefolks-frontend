import { gql } from '@apollo/client';

export const POST_FRAGMENT = gql`
  fragment PostParts on Posts {
    id
    createdAt
    updatedAt
    title
    titleImg
    viewCount
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    nickname
    profileImg
  }
`;

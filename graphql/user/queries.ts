import { gql } from '@apollo/client';
import { USER_FRAGMENT } from './../fragment';

export const ME_QUERY = gql`
  query meQuery {
    me {
      ...UserParts
      email
      role
      verified
      link
    }
  }
  ${USER_FRAGMENT}
`;

export const FIND_BY_ID_QUERY = gql`
  query findById($userId: Float!) {
    findById(userId: $userId) {
      ok
      error
      user {
        ...UserParts
        email
        role
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const FIND_BY_NICKNAME = gql`
  query findByNickName($nickname: String!) {
    findByNickName(nickname: $nickname) {
      ok
      error
      crews {
        name
        id
        profileImg
      }
      user {
        ...UserParts
        email
        link
        role
      }
    }
  }
  ${USER_FRAGMENT}
`;

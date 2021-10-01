import { gql } from '@apollo/client';
export const ME_QUERY = gql`
  query meQuery {
    me {
      id
      nickname
      email
      role
      verified
      profileImg
      link
    }
  }
`;

export const FIND_BY_ID_QUERY = gql`
  query findById($userId: Float!) {
    findById(userId: $userId) {
      ok
      error
      user {
        id
        nickname
        email
        role
        profileImg
      }
    }
  }
`;
export default {};

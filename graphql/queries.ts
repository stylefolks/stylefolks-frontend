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

export const FIND_BY_NICKNAME = gql`
  query findByNickName($nickname: String!) {
    findByNickName(nickname: $nickname) {
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

export const GET_USER_TEMP = gql`
  query getUserTemp($userId: Int!) {
    getUserTemp(userId: $userId) {
      ok
      error
      temps {
        id
        title
        titleImg
        contents
        firstCategory {
          id
          name
        }
        secondCategory {
          id
          name
        }
        image {
          link
          id
        }
      }
    }
  }
`;
export default {};

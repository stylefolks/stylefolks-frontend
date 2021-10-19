import { gql } from '@apollo/client';

export const GET_EACH_POST_QUERY = gql`
  query getEachPost($postId: Int!) {
    getEachPost(postId: $postId) {
      ok
      error
      post {
        title
        titleImg
        contents
        firstCategory {
          name
          id
        }
        secondCategory {
          name
          id
        }
        user {
          nickname
          id
          profileImg
        }
        image {
          link
          id
        }
      }
    }
  }
`;

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
        link
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

export const GET_EACH_POST_COMMENTS = gql`
  query getEachPostComments($postsId: Int!) {
    getEachPostComments(postsId: $postsId) {
      comments {
        comment
        id
        user {
          id
          nickname
          profileImg
        }
      }
      ok
      error
    }
  }
`;

export const GET_USER_CREW = gql`
  query getUserCrew($nickname: String!) {
    getUserCrew(nickname: $nickname) {
      ok
      error
      crews {
        name
        id
        profileImg
      }
    }
  }
`;

export default {};

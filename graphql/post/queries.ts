import { gql } from '@apollo/client';
import { POST_FRAGMENT, USER_FRAGMENT } from 'graphql/fragment';

export const GET_EACH_POST_QUERY = gql`
  query getEachPost($postId: Int!) {
    getEachPost(postId: $postId) {
      ok
      error
      post {
        ...PostParts
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
          ...UserParts
        }
        image {
          link
          id
        }
        crew {
          id
        }
        brand {
          id
        }
      }
    }
  }
  ${POST_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const GET_EACH_POST_COMMENTS = gql`
  query getEachPostComments($postsId: Int!) {
    getEachPostComments(postsId: $postsId) {
      comments {
        comment
        id
        createdAt
        user {
          ...UserParts
        }
      }
      ok
      error
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_POST_BY_CATEGORY = gql`
  query getPostByCategory($input: GetPostByCategoryInput!) {
    getPostByCategory(input: $input) {
      ok
      error
      totalPages
      totalResults
      post {
        ...PostParts
        contents
        comments {
          id
        }
        user {
          ...UserParts
          email
          role
        }
      }
      firstCategoryName
      secondCategoryName
    }
  }
  ${POST_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const GET_USER_ALL_POST = gql`
  query getUserPost($nickname: String!) {
    getUserPost(nickname: $nickname) {
      ok
      error
      posts {
        ...PostParts
        contents
      }
    }
  }
  ${POST_FRAGMENT}
`;

export const GET_ALL_POSTS_QUERY = gql`
  query getAllPosts($input: GetAllPostsInput!) {
    getAllPosts(input: $input) {
      ok
      error
      post {
        ...PostParts
        user {
          ...UserParts
        }
      }
      totalPages
      totalResults
    }
  }
  ${POST_FRAGMENT}
  ${USER_FRAGMENT}
`;

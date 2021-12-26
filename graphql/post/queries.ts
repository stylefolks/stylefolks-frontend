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
        viewCount
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
        crew {
          id
        }
        brand {
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

export const GET_POST_BY_CATEGORY = gql`
  query getPostByCategory($input: GetPostByCategoryInput!) {
    getPostByCategory(input: $input) {
      ok
      error
      totalPages
      totalResults

      post {
        id
        createdAt
        updatedAt
        title
        titleImg
        viewCount
        contents
        comments {
          id
        }
        user {
          email
          nickname
          role
          profileImg
        }
      }
      firstCategoryName
      secondCategoryName
    }
  }
`;

export const GET_USER_ALL_POST = gql`
  query getUserPost($nickname: String!) {
    getUserPost(nickname: $nickname) {
      ok
      error
      posts {
        id
        createdAt
        updatedAt
        title
        titleImg
        viewCount
      }
    }
  }
`;

export const GET_ALL_POSTS_QUERY = gql`
  query getAllPosts($input: GetAllPostsInput!) {
    getAllPosts(input: $input) {
      ok
      error
      post {
        id
        title
        titleImg
        user {
          id
          nickname
        }
        viewCount
      }
      totalPages
      totalResults
    }
  }
`;

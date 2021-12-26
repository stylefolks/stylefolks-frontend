import { gql } from '@apollo/client';

export const GET_CATEGORY_BY_USER_ROLE = gql`
  query getCategoryByUserRole {
    getCategoryByUserRole {
      ok
      error
      firstCategory {
        name
        id
        secondCategory {
          id
          name
        }
      }
      brands {
        name
        id
      }
      crews {
        name
        id
      }
      tempPosts {
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

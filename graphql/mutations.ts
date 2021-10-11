import { gql } from '@apollo/client';

export const DELETE_TEMP = gql`
  mutation deleteTemp($postId: Int!) {
    deleteTemp(postId: $postId) {
      ok
      error
    }
  }
`;

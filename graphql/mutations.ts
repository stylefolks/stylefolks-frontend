import { gql } from '@apollo/client';

export const DELETE_TEMP = gql`
  mutation deleteTemp($postId: Int!) {
    deleteTemp(postId: $postId) {
      ok
      error
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      ok
      error
    }
  }
`;

export const MODIFY_COMMENT = gql`
  mutation modifyComment($input: ModifyCommentInput!) {
    modifyComment(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($input: DeleteCommentInput!) {
    deleteComment(input: $input) {
      ok
      error
    }
  }
`;

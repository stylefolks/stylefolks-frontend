import { gql } from '@apollo/client';
export const CREATE_POST_MUTATION = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
      ok
      error
    }
  }
`;

export const CREATE_TEMP_MUTATION = gql`
  mutation createTemp($input: CreateTempInput!) {
    createTemp(input: $input) {
      ok
      error
    }
  }
`;

export const MODIFY_TEMP_MUTATION = gql`
  mutation modifyTemp($input: ModifyMyTemptInput!) {
    modifyTemp(input: $input) {
      ok
      error
    }
  }
`;

export const UPLOAD_TEMP_MUTATION = gql`
  mutation uploadTemp($input: UploadTempInput!) {
    uploadTemp(input: $input) {
      ok
      error
    }
  }
`;

export const MODIFY_POST = gql`
  mutation modifyPost($input: ModifyMyPostInput!) {
    modifyPost(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_POST = gql`
  mutation deleteMyPost($postId: Int!) {
    deleteMyPost(postId: $postId) {
      ok
      error
    }
  }
`;

export const DELETE_TEMP = gql`
  mutation deleteTemp($postId: Int!) {
    deleteTemp(postId: $postId) {
      ok
      error
    }
  }
`;

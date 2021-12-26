import { gql } from '@apollo/client';

export const GET_ALL_CREW = gql`
  query getAllCrew($input: GetAllCrewInput!) {
    getAllCrew(input: $input) {
      ok
      error
      totalPages
      totalResults

      crew {
        id
        profileImg
        name
        introduction
        backgroundImg
        followerCount
      }
    }
  }
`;

export const GET_CREW_BY_NAME = gql`
  query getCrewByName($input: GetCrewByNameInput!) {
    getCrewByName(input: $input) {
      ok
      error
      crew {
        id
        profileImg
        name
        introduction
        backgroundImg
        link {
          type
          href
        }
      }
      users {
        grade
        user {
          id
          nickname
          profileImg
          link
        }
      }
      manager {
        id
      }
    }
  }
`;

export const GET_CREW_POST_BY_ROLE = gql`
  query getCrewPostByRole($input: GetCrewPostByRoleInput!) {
    getCrewPostByRole(input: $input) {
      ok
      error
      posts {
        title
        titleImg
        id
        viewCount
      }
      totalPages
      totalResults
    }
  }
`;

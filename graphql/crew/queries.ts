import { gql } from '@apollo/client';
import { CREW_FRAGMENT, POST_FRAGMENT, USER_FRAGMENT } from 'graphql/fragment';

export const GET_ALL_CREW = gql`
  query getAllCrew($input: GetAllCrewInput!) {
    getAllCrew(input: $input) {
      ok
      error
      totalPages
      totalResults
      crew {
        ...CrewParts
        followerCount
      }
    }
  }
  ${CREW_FRAGMENT}
`;

export const GET_CREW_BY_NAME = gql`
  query getCrewByName($input: GetCrewByNameInput!) {
    getCrewByName(input: $input) {
      ok
      error
      crew {
        ...CrewParts
        link {
          type
          href
        }
      }
      users {
        grade
        user {
          ...UserParts
          link
        }
      }
      manager {
        id
      }
    }
  }
  ${CREW_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const GET_CREW_POST_BY_ROLE = gql`
  query getCrewPostByRole($input: GetCrewPostByRoleInput!) {
    getCrewPostByRole(input: $input) {
      ok
      error
      posts {
        ...PostParts
      }
      totalPages
      totalResults
    }
  }
  ${POST_FRAGMENT}
`;

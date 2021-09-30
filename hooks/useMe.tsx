import { gql, useLazyQuery } from '@apollo/client';
// import { ME_QUERY } from '../graphql/queries';
import { meQuery } from '../pages/__generated__/meQuery';

export const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const useMe = () => {
  return useLazyQuery<meQuery>(ME_QUERY);
};

import { useLazyQuery, useQuery } from '@apollo/client';
import { ME_QUERY } from '../graphql/queries';
// import { ME_QUERY } from '../graphql/queries';
import { meQuery } from '../src/__generated__/meQuery';

export const useLazyMe = () => {
  return useLazyQuery<meQuery>(ME_QUERY, { nextFetchPolicy: 'no-cache' });
};

export const useMe = () => {
  return useQuery<meQuery>(ME_QUERY);
};

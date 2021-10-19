import { useLazyQuery, useQuery } from '@apollo/client';
import { ME_QUERY } from '../graphql/queries';
import { meQuery } from '../src/__generated__/meQuery';

export const useLazyMe = () => {
  return useLazyQuery<meQuery>(ME_QUERY, {
    context: {
      headers: {
        'folks-token':
          typeof window !== 'undefined'
            ? localStorage.getItem('folks-token')
            : '',
      },
    },
    nextFetchPolicy: 'network-only',
    fetchPolicy: 'network-only',
  });
};

export const useMe = () => {
  return useQuery<meQuery>(ME_QUERY, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });
};

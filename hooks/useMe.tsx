import { useQuery } from '@apollo/client';
import { ME_QUERY } from '../graphql/queries';
import { meQuery } from '../pages/__generated__/meQuery';

export const useMe = () => {
  return useQuery<meQuery>(ME_QUERY);
};

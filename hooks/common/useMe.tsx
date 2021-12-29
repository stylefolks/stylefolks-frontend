import { useLazyQuery, useQuery } from '@apollo/client';
import { userInfoVar } from 'cache/common/common.cache';
import { ME_QUERY } from 'graphql/user/queries';
import { meQuery } from 'src/__generated__/meQuery';

export const useLazyMe = () => {
  const onCompleted = (data: meQuery) => {
    if (data?.me) {
      const { verified, __typename, id, ...input } = data?.me;
      userInfoVar({ id, ...input });
    }
  };

  const result = useLazyQuery<meQuery>(ME_QUERY, {
    nextFetchPolicy: 'network-only',
    fetchPolicy: 'network-only',
    onCompleted,
  });
  return result;
};

export const useMe = () => {
  const onCompleted = (data: meQuery) => {
    if (data?.me) {
      const { verified, __typename, id, ...input } = data?.me;
      userInfoVar({ id, ...input });
    }
  };

  return useQuery<meQuery>(ME_QUERY, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
    onCompleted,
  });
};

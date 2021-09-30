import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { useMemo } from 'react';
import { UserRole } from '../src/__generated__/globalTypes';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

const token =
  typeof window !== 'undefined' ? localStorage?.getItem('folks-token') : '';

export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);
export const userInfoVar = makeVar<{
  email?: string;
  id?: number;
  role?: UserRole;
}>({});

let apolloClient;

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  headers: {
    'folks-token': authTokenVar() || '',
  },
});

//컨텍스트에서 처리하는건 웹소켓 연결 시 가능한거임 ㅇㅇ..
// const authLink = setContext((_, { headers }) => {
//   return {
//     ...headers,
//     'folks-token': authTokenVar() || '',
//   };
// });

//나중에 웹소켓 연결 시 하단 split링크 사용
// const splitLink = split(({ query }) => {
//   const definition = getMainDefinition(query);
//   return (
//     definition.kind === 'OperationDefinition' &&
//     definition.operation === 'subscription'
//   );
// }, authLink.concat(httpLink));

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: httpLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            token: {
              read() {
                return authTokenVar();
              },
            },
            isLoggedIn: {
              read() {
                return isLoggedInVar();
              },
            },
            allPosts: concatPagination(),
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}

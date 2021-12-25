import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';
import { authTokenVar } from 'cache/common/common.cache';
import {
  isAlert,
  isLoggedIn,
  nickname,
  token,
  writtenPost,
} from 'cache/common/common.field';
import { uploadDialog } from 'cache/upload/upload.field';
import {
  isUserTotalPost,
  isVisibleEditProfileModal,
  isVisibleProfileImageModal,
} from 'cache/user/user.field';
import { folksServer } from 'config';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { useMemo } from 'react';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient;

const httpLink = createHttpLink({
  uri: folksServer,
  headers: {
    'folks-token': authTokenVar() || '',
  },
});

//middleware
//ref: https://medium.com/risan/set-authorization-header-with-apollo-client-e934e6517ccf
const authLink = new ApolloLink((operation, forward) => {
  //로컬스토리지로부터 토큰 받아오기
  const token = authTokenVar();

  // HTTP headers 세팅을 위해 setContext method 사용
  operation.setContext({
    headers: {
      'folks-token': token ? token : '',
    },
  });

  return forward(operation);
});

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
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            nickname,
            token,
            isLoggedIn,
            isUserTotalPost,
            allPosts: concatPagination(),
            isVisibleProfileImageModal,
            isVisibleEditProfileModal,
            isAlert,
            writtenPost,

            uploadDialog,
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // Next.js 페이지가 apolloClient의 메소드를 사용해 data fetching하는 경우, 초기 상태값이 여기서 hydrate 된다.
  if (initialState) {
    //  client side 에서 data를 fetch하는 동안 존재하는 캐시를 가져오고 읽음.
    const existingCache = _apolloClient.extract();

    // getStaticProps/getServerSideProps로 부터 넘어온 데이터랑 존재하는 cache랑 합침
    const data = merge(initialState, existingCache, {
      // object equality (like in sets)을 사용해서 배열 합침
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // 받아온 데이터와 존재한 캐시를 합친 데이터를 다시 저장함
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

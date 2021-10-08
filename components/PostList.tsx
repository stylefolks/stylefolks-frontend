import { gql, NetworkStatus, useQuery } from '@apollo/client';
import Link from 'next/link';
import {
  getPostForMainCategoryPage,
  getPostForMainCategoryPageVariables,
} from '../src/__generated__/getPostForMainCategoryPage';
import { FirstCategoryName } from '../src/__generated__/globalTypes';
import ErrorMessage from './ErrorMessage';
export const GET_POST_FOR_MAIN_CATEGORY_PAGE = gql`
  query getPostForMainCategoryPage($input: GetPostForMainCategoryPageInput!) {
    getPostForMainCategoryPage(input: $input) {
      ok
      error
      post {
        id
        title
        user {
          nickname
        }
      }
    }
  }
`;

export const allPostsQueryVars = {
  skip: 0,
  first: 10,
};

export default function PostList() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery<
    getPostForMainCategoryPage,
    getPostForMainCategoryPageVariables
  >(GET_POST_FOR_MAIN_CATEGORY_PAGE, {
    variables: {
      input: {
        postCount: 1,
        firstCategoryName: FirstCategoryName.FOLKS,
      },
    },
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  // const loadMorePosts = () => {
  //   fetchMore({
  //     variables: {
  //       skip: allPosts.length,
  //     },
  //   });
  // };

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading && !loadingMorePosts) return <div>Loading</div>;

  // const { allPosts, _allPostsMeta } = data;
  // const areMorePosts = allPosts.length < _allPostsMeta.count;

  return (
    <section>
      <ul style={{ display: 'flex', flexDirection: 'column' }}>
        {/* {allPosts.map((post, index) => (
          <li key={post.id}>
            <div>
              <span>{index + 1}. </span>
              <a href={post.url}>{post.title}</a>
              <PostUpvoter id={post.id} votes={post.votes} />
            </div>
          </li>
        ))} */}

        {data?.getPostForMainCategoryPage?.post?.map((el) => (
          <Link href={`post/${el.id}`} key={el.id}>
            <a>{el.title}</a>
          </Link>
        ))}
      </ul>
      {/* {areMorePosts && (
        <button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
          {loadingMorePosts ? 'Loading...' : 'Show More'}
        </button>
      )} */}
      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: '';
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </section>
  );
}

const isProd = process.env.NODE_ENV === 'production';

export const folksServer = `${
  isProd ? 'http://api.the-folks.com/graphql' : 'http://localhost:4000/graphql'
}`;
export const folksServerNoGql = `${
  isProd ? 'http://api.the-folks.com' : 'http://localhost:4000'
}`;

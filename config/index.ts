const isProd = process.env.NODE_ENV === 'production';
// export const folksServer = dev
//   ? 'http://localhost:4000/graphql'
//   : 'http://api.the-folks.com/graphql';
// export const folksServerNoGql = dev
//   ? 'http://localhost:4000'
//   : 'http://api.the-folks.com';
export const folksServer = `${
  isProd ? 'https://api.the-folks.com/graphql' : 'http://localhost:4000/graphql'
}`;
export const folksServerNoGql = `${
  isProd ? 'https://api.the-folks.com' : 'http://localhost:4000'
}`;

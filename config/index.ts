const dev = process.env.NODE_ENV !== 'production';
export const folksServer = dev
  ? 'http://api.the-folks.com/graphql'
  : 'http://api.the-folks.com/graphql';
export const folksServerNoGql = dev
  ? 'http://api.the-folks.com'
  : 'http://api.the-folks.com';

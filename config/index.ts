const dev = process.env.NODE_ENV !== 'production';
export const folksServer = dev
  ? 'https://api.the-folks.com:4000/graphql'
  : 'https://api.the-folks.com:4000/graphql';

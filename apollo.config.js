module.exports = {
  client: {
    includes: [
      './components/**/*.{tsx,ts}',
      './graphql/**/*.{tsx,ts}',
      './pages/**/*.{tsx,ts}',
    ],
    tagName: 'gql',
    service: {
      name: 'stylefolks-backend',
      url:
        process.env.NODE_ENV === 'production'
          ? 'http://api.the-folks.com/graphql'
          : 'http://localhost:4000/graphql',
      // // url: 'http://localhost:4000/graphql',
      // url: folksServer,
    },
  },
};

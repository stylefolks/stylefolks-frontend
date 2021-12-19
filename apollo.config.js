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
      url: 'http://api.the-folks.com/graphql',
      // // url: 'http://localhost:4000/graphql',
      // url: folksServer,
    },
  },
};

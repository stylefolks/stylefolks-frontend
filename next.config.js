const path = require('path');
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "variables.scss";`,
  },
  reactStrictMode: true,
  images: {
    domains: ['thefolksofstyle.s3.amazonaws.com', 'localhost'],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    return config;
  },
  webpackDevMiddleware: (config) => {
    return config;
  },
};

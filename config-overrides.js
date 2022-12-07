// Used to make the build reproducible between different machines (IPFS-related)

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack');

module.exports = (config, env) => {
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto',
    resolve: {
      fullySpecified: false,
    },
  });

  config.plugins = [
    ...config.plugins,
    new NodePolyfillPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ];
  if (env !== 'production') {
    return config;
  }
  config.output.filename = `static/js/[name].js`;
  config.output.chunkFilename = `static/js/[name].chunk.js`;
  return config;
};


// Used to make the build reproducible between different machines (IPFS-related)
module.exports = (config, env) => {
  if (env !== 'production') {
    return config;
  }
  config.output.filename = `static/js/[name].js`;
  config.output.chunkFilename = `static/js/[name].chunk.js`;
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto',
  });
  return config;
};

// this file overrides the default CRA configurations (webpack, eslint, babel, etc)
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const million = require('million/compiler');

module.exports = function override(config, env) {
  //do stuff with the webpack config...

  config.resolve.fallback = {
    http: require.resolve('stream-http'),
    stream: require.resolve('stream-browserify'),
    https: require.resolve('https-browserify'),
    zlib: require.resolve('browserify-zlib'),
    url: require.resolve('url'),
    assert: require.resolve('assert'),
    crypto: require.resolve('crypto-browserify'),
    os: require.resolve('os-browserify/browser'),
    buffer: require.resolve('buffer'),
    tty: require.resolve('tty-browserify'),
  };

  // Remove ModuleScopePlugin which throws when we try to import something
  // outside of src/.
  config.resolve.plugins.pop();

  // Resolve the path aliases.
  config.resolve.plugins.push(new TsconfigPathsPlugin());

  // config.resolve.plugins.push(million.webpack({ auto: true }));

  // Let Babel compile outside of src/.
  const oneOfRule = config.module.rules.find((rule) => rule.oneOf);
  const tsRule = oneOfRule.oneOf.find((rule) => rule.test.toString().includes('ts|tsx'));

  tsRule.include = undefined;
  tsRule.exclude = /node_modules/;

  console.log('config: ', config);

  config.plugins.push(million.webpack({ auto: true }));

  return config;
};

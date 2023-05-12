const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');

// Nx plugins for webpack.
module.exports = composePlugins(withNx({
  skipTypeChecking: true,
}), withReact({
  baseHref: process.env.NODE_ENV === 'production' ? '/chart-table/' : '/',
}), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  return config;
});

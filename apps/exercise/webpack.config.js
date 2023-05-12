const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');

// Nx plugins for webpack.
module.exports = composePlugins(withNx({
  skipTypeChecking: true,
}), withReact(), (config) => {
  // Fix github pages blank page issue.
  config.output.publicPath = process.env.NODE_ENV === 'production' ? '/chart-table/' : '/';

  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  return config;
});

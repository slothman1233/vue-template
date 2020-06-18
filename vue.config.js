/* eslint-disable @typescript-eslint/no-var-requires */
// const CopyPlugin = require('copy-webpack-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const path = require('path')

const config = {
  configureWebpack: {
    devServer: {
      port: 9003,
      sockPort: 9003,
      sockHost: 'localhost',
      proxy: {
        '/api': {
          target: 'http://120.25.195.4:31688',
          changeOrigin: true,
        }
      },
      hot: true
    },
    plugins: [
      new WebpackAssetsManifest(),
    ],
  },
  filenameHashing: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/common/style/PublicDefind.less'),
      ],
    },
  },
};
module.exports = config

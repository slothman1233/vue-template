const WebpackAssetsManifest = require('webpack-assets-manifest')

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin


///是否是开发环境
const debug = process.env.NODE_ENV !== "production";
const plugins = [
  new WebpackAssetsManifest()
]
if(!debug){
  plugins.push(new BundleAnalyzerPlugin())
}
module.exports = plugins
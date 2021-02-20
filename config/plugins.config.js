const WebpackAssetsManifest = require('webpack-assets-manifest')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


///是否是开发环境
const debug = process.env.NODE_ENV !== 'production'
const plugins = [
    new WebpackAssetsManifest()
]
/* if(!debug){
  走自动发布会卡住 所以禁掉 需要的时候放开看 要记得关
  plugins.push(new BundleAnalyzerPlugin())
} */
module.exports = plugins
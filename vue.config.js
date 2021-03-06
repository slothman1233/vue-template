/* eslint-disable @typescript-eslint/no-var-requires */
// const CopyPlugin = require('copy-webpack-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin


///是否是开发环境
const debug = process.env.NODE_ENV !== "production";
const path = require('path')
const { externals, cdn } = require('./ex.config')
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
            new WebpackAssetsManifest(), !debug ? new BundleAnalyzerPlugin() : ""
        ],
        devtool: debug ? 'cheap-module-eval-source-map' : "",
        externals,
        optimization: {
            splitChunks: {
                chunks: 'all',
                minSize: 30000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '~',
                name: true,
                cacheGroups: {
                    vendors: {
                        name: "vendors",
                        test: /[\\/]node_modules[\\/]/,
                        minSize: 0,
                        priority: 2
                    },

                    default: {
                        name: "default",
                        minChunks: 2,
                        minSize: 0,
                        priority: -20,
                        reuseExistingChunk: true
                    },
                }
            },
        },



    },
    chainWebpack: config => {
        config.plugin("html").tap(args => {
            // CDN
            if (debug) {
                args[0].cdn = cdn.dev;
            } else {
                args[0].cdn = cdn.build;
            }

            return args;
        });




    },
    filenameHashing: false,
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/common/style/PublicDefind.less'),
                path.resolve(__dirname, './src/common/style/variables.less'),
            ],
        },
    },
    css: {

        // 配置高于chainWebpack中关于css loader的配置
        // modules: true, // 是否开启支持‘foo.module.css’样式
        extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
        // sourceMap: false, // 是否在构建样式地图，false将提高构建速度
        // loaderOptions: { // css预设器配置项
        //     less: {
        //         loaderOptions: {
        //             data: `@import "@/common/style/PublicDefind.less";@import "@/src/common/style/variables.less";`
        //         }
        //     }
        // }
    },
};
module.exports = config
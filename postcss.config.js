const APP_NAME = require('./package.json').name
module.exports = () => {
    return {
        plugins: [
            require('postcss-plugin-namespace')(`#${APP_NAME}`, { ignore: [/^\.el-/, /^[^\.]/, /^#/] }),
            require('autoprefixer')
        ],
    }
}

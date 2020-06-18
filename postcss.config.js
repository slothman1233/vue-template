module.exports = () => {
  return {
    plugins: [
      require('postcss-plugin-namespace')('#huihun-admin', { ignore: [/^\.el-/, /^[^\.]/, /^#/] }),
      require('autoprefixer')
    ],
  }
}

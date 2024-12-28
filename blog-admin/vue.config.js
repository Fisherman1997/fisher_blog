const { defineConfig } = require('@vue/cli-service')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave:false,
  // configureWebpack: config => {
  //   // js output config
  //   config.output.filename = 'admin/js/[name].[contenthash:8].js'
  //   config.output.chunkFilename = 'admin/js/[name].[contenthash:8].js'

  // },
  // chainWebpack: config => {
  //     // css output config
  //   let miniCssExtractPlugin = new MiniCssExtractPlugin({
  //     filename: 'admin/css/[name].[contenthash:8].css',
  //     chunkFilename: 'admin/css/[name].[contenthash:8].css'
  //   })
  //   config.plugin('extract-css').use(miniCssExtractPlugin)

  //     // image output config
      

  // },
  assetsDir: 'admin',
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true
      },
      "/imgS": {
        target: "http://localhost:5000",
        changeOrigin: true
      }
    }
  }
})

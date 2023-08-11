const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://43.201.84.77:4040',
        changeOrigin: true,
      },
      '/attachments': {
        target: 'http://43.201.84.77:4040',
        changeOrigin: true,
      }
    }
  }
})

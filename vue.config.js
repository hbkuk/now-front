const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://13.125.89.193:4040',
        changeOrigin: true,
      },
      '/attachments': {
        target: 'http://13.125.89.193:8080',
        changeOrigin: true,
      }
    }
  }
})

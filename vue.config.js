const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        devServer: {
            allowedHosts: "all",
            client: {
                webSocketURL: 'auto://0.0.0.0:0/ws'
            },
            proxy: {
                '/api': {
                    target: 'http://52.79.152.234:4040',
                    changeOrigin: true,
                },
                '/attachments': {
                    target: 'http://52.79.152.234:4040',
                    changeOrigin: true,
                }
            }
        }
    }
});

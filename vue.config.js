const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        allowedHosts: "all",
        client: {
            webSocketURL: 'auto://0.0.0.0:0/ws'
        },
        proxy: {
            '/api': {
                target: `${process.env.VUE_APP_BACK_URL}`,
                changeOrigin: true,
            },
        }
    },
});

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: [
      'cn-cd-dx-tmp18.natfrp.cloud',
      '.cn-cd-dx-tmp18.natfrp.cloud'
    ],
    port: 80
  }
})

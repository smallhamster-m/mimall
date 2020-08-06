module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'store': '@/store',
        'storage': '@/storage',
        'api': '@/api',
      }
    }
  },
  devServer: {
    host: 'localhost',
    port: 8081,
    proxy: {
      'api': {
        target: 'http://mall-pre.springboot.cn',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  // lintOnSave: false
  // 删除预加载，真正做到路由的按需加载
  // chainWebpack:(config) => { 
  //   config.plugins.delete('prefetch')
  // }
}
const proxy = require('http-proxy-middleware')
module.exports = function(app){//配置反向代理
    app.use(
        proxy(
          '/api',
          {
              target: 'https://api.zhuishushenqi.com',
              secure: false,
              changeOrigin: true,
              pathRewrite: {
                  '^/api': ''
              }
          }
      )   
    ),
    app.use(
        proxy(
          '/content',
          {
              target: 'https://chapter2.zhuishushenqi.com/',
              secure: false,
              changeOrigin: true,
              pathRewrite: {
                  '^/content': ''
              }
          }
      )   
    ),
    app.use(
        proxy(
          '/lxy',
          {
              target: 'http://localhost:8881',
              secure: false,
              changeOrigin: true,
              pathRewrite: {
                  '^/lxy': ''
              }
          }
      )   
    )

}
    


    // proxy: {
    //   '/api': {
    //     target: 'https://api.zhuishushenqi.com',
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   },
    //   '/content': {
    //     target: 'https://chapter2.zhuishushenqi.com/',
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/content': 'https://chapter2.zhuishushenqi.com/'
    //     }
    //   },
    //   '/sqlapi': {
    //     target: 'http://localhost:3000/sqlapi',
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/sqlapi': ''
    //     }
    //   }
    // }


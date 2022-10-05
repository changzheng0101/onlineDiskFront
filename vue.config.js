// 目前没啥用
const productConfig = require("./public/config.json"); // 引入config.json文件
module.exports = {
    devServer: {
        open: true,
        host: "localhost",
        port: 8080,
        https: false,
        proxy: {
            //配置代理，解决跨域请求后台数据的问题
            "/api": {
                target: productConfig.baseUrl, //后台接口，连接本地服务
                ws: true, //是否跨域
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "",
                },
            },
        },
    },
};
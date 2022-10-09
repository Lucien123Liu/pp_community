const express = require("express"),
    bodyParser = require("body-parser"),
    config = require("./config");
//创建应用程序
const app = express();

//全局注册使用bodyParser,处理json，raw,URL-encode格式请求体等
app.use(bodyParser.json())
//create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))

//路由设置

// const baseUrl = "/api";
// const user = require('./router/home/user')
// //路由挂载
// //个人中心路由
// app.use(`${baseUrl}/user`, user)
// const home = require('./router/home/home')
// //首页
// app.use(`${baseUrl}`, home)

// 静态资源访问路径，默认访问index.html
app.use(express.static(__dirname + '/public'));

// 404
app.use(function (req, res, next) {
    console.log(req, 'req--------');
    // return res.status(404).send(responseJson.errorJson(apiError.NOT_FIND))
    return res.status(404).send(404);
});

// 500 - Any server error
app.use(function (err, req, res, next) {
    // return res.status(500).send(responseJson.errorJson(apiError.NET_FAIL));
    return res.status(500).send(500);
});

const ip = config.baseConfig.ip;
const configHost = config.baseConfig.address;
app.listen(ip, () => {
    console.log(configHost + ip);
});

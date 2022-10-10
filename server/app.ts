import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import {ErrorRequestHandler, Request, Response, NextFunction} from 'express';
//创建应用程序
const app = express();

//全局注册使用bodyParser,处理json，raw,URL-encode格式请求体等
app.use(bodyParser.json())
//create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({extended: false}))

// 静态资源访问路径，默认访问index.html
app.use(express.static(__dirname + '/public'));

app.use('/webAPI/users', require('./routes/users/index'));
app.use('/pageAPI', require('./routes/pageAPI'));

// 404
app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log('err-req--------');
    // return res.status(404).send(responseJson.errorJson(apiError.NOT_FIND))
    return res.status(404).send(404);
});

// 500 - Any server error
app.use(function (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    // return res.status(500).send(responseJson.errorJson(apiError.NET_FAIL));
    return res.status(500).send(500);
});

const ip = config.baseConfig.ip;
const configHost = config.baseConfig.address;
app.listen(ip, () => {
    console.log(configHost + ip);
});

const http = require('http');
const path = require('path');
const config = require(path.resolve(__dirname, '../../config/index'));

import express from 'express';
import {Request, Response, NextFunction} from 'express';

interface OPTIONS {
    [key: string]: any
}

function translateReqFn(req: Request, res: Response, option: OPTIONS) {
    //接收客户端发送的数据
    const np = new Promise((resolve, reject) => {
        const postbody: Buffer[] = [];
        req.on("data", (chunk: Buffer) => {
            postbody.push(chunk);
        })
        req.on("end", () => {
            const postBodyBuffer: Buffer = Buffer.concat(postbody);
            resolve(postBodyBuffer)
        })
    });
    //将数据转发，并接收目标服务器返回的数据，然后转发给客户端
    np.then((postBodyBuffer) => {
        const responseBody: Buffer[] = [];
        const request = http.request(option, (response: Response) => {
            response.on("data", (chunk) => {
                responseBody.push(chunk)
            })
            response.on("end", () => {
                const responseBodyBuffer = Buffer.concat(responseBody);
                res.send(responseBodyBuffer);
            });
        });
        // 使用request的write方法传递请求体
        request.write((postBodyBuffer as Buffer).toString('utf8'));
        // 使用end方法将请求发出去
        request.end();
    });
}


const router = express.Router();

router.get('/data/development', async (req: Request, res: Response, next: NextFunction) => {
    const {
        hostname,
        path,
        headers,
        method,
    } = req || {};
    const option: OPTIONS = {
        hostname,
        headers,
        method,
        port: config.pagePort,
        path: '/pageAPI' + path,
        agent: false
    };
    res.setHeader('Content-type', 'application/javascript');
    translateReqFn(req, res, option);
});
module.exports = router;
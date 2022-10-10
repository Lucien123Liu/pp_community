const http = require('http');
const path = require('path');
const config = require(path.resolve(__dirname, '../../config/index'));
// const config = require('../../config/index');

import express from 'express';
import {Request, Response, NextFunction} from 'express';

function reqCallback (res: Response) {
    const bufferArray: Buffer[] = [];
    res.on('data', function (chunk: Buffer) {
        bufferArray.push(chunk);
    });
    res.on('end', function () {
        console.log(123, '-123');
        res.send(Buffer.concat(bufferArray));
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
    const option = {
        hostname,
        headers,
        method,
        port: config.pagePort,
        path: '/pageAPI' + path,
        agent: false
    };
    res.send(JSON.stringify(option));
});
module.exports = router;
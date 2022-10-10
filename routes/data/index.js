const express = require('express');
const router = express.Router();
/**
 * DEV 模式下注入到页面数据123
 */
router.get('/development', async (req, res, next) => {
    let jsContent = `var SYSTEM_CONFIG = 'lzj';`;
    res.header('Content-type', 'application/javascript');
    res.send(jsContent);
});
module.exports = router;

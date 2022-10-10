// 总入口
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/pageAPI/data', require('./routes/data'));

module.exports = app;
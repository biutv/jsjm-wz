const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.use(express.json()); // 替代 body-parser

// 健康检查
app.get('/', (req, res) => {
    res.json({ status: 'ok', service: 'js-decoder' });
});

module.exports.handler = serverless(app);

const express = require('express');
const serverless = require('serverless-http');

const app = express();

// 临时注释所有插件引入
// const PluginCommon = require('./plugin/common.js');
// const PluginJjencode = require('./plugin/jjencode.js');
// const PluginSojson = require('./plugin/sojson.js');
// const PluginSojsonV7 = require('./plugin/sojsonv7.js');
// const PluginObfuscator = require('./plugin/obfuscator.js');
// const PluginAwsc = require('./plugin/awsc.js');

const decodeRouter = express.Router();

// 临时注释所有解码路由
// decodeRouter.post('/v7', ...);
// decodeRouter.post('/sojson', ...);
// decodeRouter.post('/common', ...);
// decodeRouter.post('/jj', ...);
// decodeRouter.post('/Obfuscator', ...);
// decodeRouter.post('/awsc', ...);

// 只保留健康检查
app.get('/', (req, res) => {
    res.json({ status: 'ok', service: 'js-decoder-test' });
});

// 如果访问其他路径返回 404
app.use((req, res) => {
    res.status(404).json({ code: 0, msg: "Not Found" });
});

module.exports.handler = serverless(app);

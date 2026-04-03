// 在文件最开头添加错误捕获
try {
  // 原有的 require 和代码放在这里
  const express = require('express');
  const bodyParser = require('body-parser');
  const serverless = require('serverless-http');

  const PluginCommon = require('./plugin/common.js');
  const PluginJjencode = require('./plugin/jjencode.js');
  const PluginSojson = require('./plugin/sojson.js');
  const PluginSojsonV7 = require('./plugin/sojsonv7.js');
  const PluginObfuscator = require('./plugin/obfuscator.js');
  const PluginAwsc = require('./plugin/awsc.js'); // 如果 awsc 还没改，可以临时禁用

  const app = express();
  const decodeRouter = express.Router();

  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.use(bodyParser.json({ limit: '10mb' }));

  decodeRouter.post('/v7', (req, res) => processDecodeRequest(req, res, PluginSojsonV7));
  decodeRouter.post('/sojson', (req, res) => processDecodeRequest(req, res, PluginSojson));
  decodeRouter.post('/common', (req, res) => processDecodeRequest(req, res, PluginCommon));
  decodeRouter.post('/jj', (req, res) => processDecodeRequest(req, res, PluginJjencode));
  decodeRouter.post('/Obfuscator', (req, res) => processDecodeRequest(req, res, PluginObfuscator));
  decodeRouter.post('/awsc', (req, res) => processDecodeRequest(req, res, PluginAwsc));

  function processDecodeRequest(req, res, Plugin) {
    try {
      const contentType = req.headers['content-type'];
      let sourceCode;
      if (contentType?.startsWith('application/json') || 
          contentType?.startsWith('application/x-www-form-urlencoded')) {
        sourceCode = req.body.code;
      } else {
        throw new Error("参数错误");
      }
      console.log('request come', sourceCode?.substring(0, 100) + '...');
      const decodedCode = Plugin(sourceCode);
      if (!decodedCode) {
        throw new Error("解码失败");
      }
      res.status(200).json({ code: 1, msg: "success", data: decodedCode });
    } catch (e) {
      console.error(e);
      res.status(500).json({ code: 0, msg: e.message });
    }
  }

  app.use('/decode', decodeRouter);

  app.get('/', (req, res) => {
    res.json({
      status: 'ok',
      service: 'js-decoder',
      endpoints: ['/decode/common', '/decode/jj', '/decode/sojson', '/decode/v7', '/decode/Obfuscator', '/decode/awsc']
    });
  });

  app.use((req, res) => {
    res.status(404).json({ code: 0, msg: "Not Found" });
  });

  module.exports.handler = serverless(app);
} catch (error) {
  console.error('Failed to load api/index.js:', error);
  // 导出一个简单的错误处理函数，以便 Vercel 能启动
  module.exports.handler = (req, res) => {
    res.status(500).json({ error: error.message, stack: error.stack });
  };
}

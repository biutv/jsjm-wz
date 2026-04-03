import express from 'express';
import serverless from 'serverless-http';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 测试路由
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    project: 'jsjm-wz',
    message: '部署成功'
  });
});

// 加载所有插件
import sojson from './plugin/sojson.js';
import obfuscator from './plugin/obfuscator.js';
import jjencode from './plugin/jjencode.js';
import awsc from './plugin/awsc.js';
import common from './plugin/common.js';
import sojsonv7 from './plugin/sojsonv7.js';
import evalTool from './plugin/eval.js';
import tool1 from './plugin/1.js';

// 解码接口
app.post('/decode/sojson', async (req, res) => {
  try {
    const result = sojson(req.body.code);
    res.send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post('/decode/obfuscator', async (req, res) => {
  try {
    const result = obfuscator(req.body.code);
    res.send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post('/decode/jjencode', async (req, res) => {
  try {
    const result = jjencode(req.body.code);
    res.send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post('/decode/awsc', async (req, res) => {
  try {
    const result = awsc(req.body.code);
    res.send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post('/decode/common', async (req, res) => {
  try {
    const result = common(req.body.code);
    res.send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post('/decode/sojsonv7', async (req, res) =>
{
  try {
    const result = sojsonv7(req.body.code);
    res.send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post('/decode/eval', async (req, res) => {
  try {
    const result = evalTool.unpack(req.body.code);
    res.send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post('/decode/1', async (req, res) => {
  try {
    const result = tool1(req.body.code);
    res.send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// ✅✅✅ 这一行是 Vercel 强制要求的格式！！！
export default serverless(app);

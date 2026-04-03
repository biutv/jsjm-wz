const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.get('/', (req, res) => res.json({ status: 'ok' }));

module.exports.handler = serverless(app);

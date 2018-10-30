const express = require('express');
const logger = require('morgan');
const path = require('path');
const ABTesting = require('./ABtesting/abtesting');
const cookiesMiddleware = require('universal-cookie-express');
const app = express();

app.use(logger('dev'));
app.use(express.static('static'));
app.use(cookiesMiddleware());

const testA = new ABTesting('variantA');

// AB testing route
app.get('*', testA.middleware, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'))
});

// app start up
module.exports = app;
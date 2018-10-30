const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const ABTesting = require('./ABtesting/abtesting');
const cookiesMiddleware = require('universal-cookie-express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('static'));
app.use(cookiesMiddleware());

const testA = new ABTesting('variantA');

// AB testing route
app.get('*', testA.middleware, (req, res) => {
    res.cookie(testA.cookie.key, testA.cookie.value);
    res.sendFile(path.resolve(__dirname, '../public/index.html'))
});

// app start up
module.exports = app;
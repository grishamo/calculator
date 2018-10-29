const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const ABTesting = require('./modules/abtesting');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('static'));

const testA = new ABTesting('variantA');

// AB testing route
app.get('*', testA.middleware, (req, res) => {
    console.log('got request variantA');
    res.sendFile(path.resolve(__dirname, '../public/index.html'))
});

// main route
app.get('*', (req, res) => {
    console.log('got request regular');
    res.sendFile(path.resolve(__dirname, '../public/index.html'))
});


// app start up
module.exports = app;
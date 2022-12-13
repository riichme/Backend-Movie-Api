if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

var express = require('express');
var path = require('path');
const cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = require('./routes/index');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

module.exports = app;

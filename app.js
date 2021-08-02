var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var waterMeterRouter = require('./routes/watermeter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/watermeter', waterMeterRouter);

app.use('*', (req, res) => {
	res.render('index')
});

// import database
require('./database');

module.exports = app;
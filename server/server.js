var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/rabbithole');
mongoose.connect('mongodb://heroku_app36629506:aqb6rbp5a4c1mqud45pa56smp1@ds031952.mongolab.com:31952/heroku_app36629506');

var express  = require('express');
var app = express();
require('./middleware.js')(app, express);

module.exports = app;
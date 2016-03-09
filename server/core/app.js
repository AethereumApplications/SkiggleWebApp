var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = require('./router');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var port = process.env.PORT || 3000;
var app = express();

// configure the mongodb database and mongoose
mongoose.connect(require(path.join(__dirname + '/../config/database/database')).dbUrl);

// configure passportJS authentication
require(path.join(__dirname + '/../config/auth/passport'))(passport);

// pass request through various middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// use passportJS authentication middleware
app.use(session({
    secret : '%Th1sB3AWebbApp4SK1GGL3$',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

// pass configured app and passport to router
router(app, passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status);
    res.send('Error ' + err.status);
});

// start server
app.listen(port, function() {
    console.log('Server listening on port ' + port + '.');
});
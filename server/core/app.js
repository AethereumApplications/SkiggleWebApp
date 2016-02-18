var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = require('./router');
var path = require('path');
var app = express();

// pass request through middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// static library files - unrestricted access
app.use('/lib', express.static(path.join(__dirname + '/../../client/lib')));

// common assets between angular apps - unrestricted access
app.use('/common', express.static(path.join(__dirname + '/../../client/common')));

// static files for home - unrestricted access
app.use('/', express.static(path.join(__dirname + '/../../client/home')));

// mount router for restricted access
app.use(router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status);
        res.send('Error ' + err.status + ' - Can\'t find that! (Dev)');
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status);
    res.send('Error ' + err.status + ' - Can\'t find that! (Pro)');
});

// start server
app.listen(3000, function() {
    console.log('Server listening on port 3000.');
});
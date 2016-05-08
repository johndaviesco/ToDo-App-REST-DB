var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./server/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './client', 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });


app.use(function(err, req, res, next) {
  if (res.statusCode == 400){
    res.status(400);
    res.send('Bad Request');
  }
  if (res.statusCode == 401){
    res.status(401);
    res.send('Unauthorized');
  }
  if (res.statusCode == 403){
    res.status(403);
    res.send('Unauthorized');
  }
  if (res.statusCode == 404){
    res.status(404);
    res.send('Not Found');
  }
  if (res.statusCode == 502){
    res.status(502);
    res.send('Bad Gateway');
  }
  if (res.statusCode == 504){
    res.status(504);
    res.send('Gateway Timeout');
  }
  else{
    next(err);
  }
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

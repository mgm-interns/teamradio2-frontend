var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var compression = require('compression');

var app = express();

// Enable some config for server
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static assets
app.use(express.static(path.join(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.use('*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '..', 'build', 'index.html'),
  );
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var express         = require('express');
var path            = require('path');
var favicon         = require('static-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');  
var stylus          = require('stylus');    

var routes          = require('./routes/index');
var users           = require('./routes/users');
var mainScreen      = require('./routes/home');
var apis            = require('./bin/apis');
var nim             = require('nib');
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

var app = express();
    app.listen(4000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
console.log(__dirname + '/public/stylus/');
app.use(stylus.middleware(
  {     
    src  : __dirname + '/public/stylus/', 
    dest : __dirname + '/public/',
    debug: true,
    force: true
  }
));

app.use(favicon());
app.use(logger('dev'));
/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded());*/

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'uploaded_images')));

//Middlware to compile stylus


/*
* All Routes go here
*/

app.get("/", mainScreen);
app.get("/api/imagelist", apis.getImages)
app.post("/upload", apis.upload);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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

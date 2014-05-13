var express = require('express'),
    path = require('path'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),

    stylus = require('stylus'),
    nib = require('nib');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use('/', routes);

app.use(stylus.middleware({
    // src: __dirname + '/styles',
    src: __dirname,
    dest: __dirname + '/public',
    debug: true,
    compile: function (str, path) {
        return stylus(str)
            .set('filename', path)
            .set('warn', true)
            .set('paths', [ __dirname + '/styles' ])
            .use(nib())
            .import('nib')
            .import('mixins');
    }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/styles/vendor', express.static(path.join(__dirname, 'bower_components')));

// app.use(express.static('public'));

/// error handlers
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

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

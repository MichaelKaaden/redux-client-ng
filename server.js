var express = require('express');
var http = require('http');
// var https = require('https');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var fs = require('fs');

/**
 * Read the SSL/TLS certificate
 */
// var certs = {
//     key: fs.readFileSync('nginx/cert/server.key'),
//     cert: fs.readFileSync('nginx/cert/server.crt')
// };

var app = express();

app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'dist')));

// capture all unmatched URL requests to send index.html instead
var jsonFiles1 = RegExp('.*\.json$'); // plain JSON URL
var jsonFiles2 = RegExp('.*\.json\?'); // JSON URL with query parameter
app.use(function (req, res) {
    // send 404 for JSON file requests that aren't available per static asset
    if (jsonFiles1.test(req.originalUrl) || jsonFiles2.test(req.originalUrl)) {
        res.sendStatus(404);
    }
    else {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// catch unauthorized errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({
            "message": err.name + ": " + err.message
        });
    }
});

// development error handler
// will print stacktrace
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

var port = normalizePort(process.env.PORT || '9000');

/**
 * Create the HTTP server.
 */

var httpsServer = http.createServer(app);
// var httpsServer = https.createServer(certs, app);

/**
 * Listen on provided port, on all network interfaces.
 */

httpsServer.listen(port);
httpsServer.on('error', onError);
httpsServer.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = httpsServer.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.info('Listening on ' + bind);
}

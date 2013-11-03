var express = require('express');
var fs = require('fs');
var http = require('http');
var cons = require('consolidate');
var mubsub = require('mubsub');
var socketIo = require('socket.io');
var config = require('./config');

var client = mubsub(config.mubsubChannelUri);
var channel = client.channel(config.mubsubChannelName);

var app = express();
var server = http.createServer(app);
var io = socketIo.listen(server);

client.on('error', console.error);
channel.on('error', console.error);

app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));
app.engine('html', cons.hogan);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

server.listen(config.port, function() {
    console.log("Listening on " + config.port);
});

app.get('/', function(request, response) {
    response.render('index', {msg: 'Hello'});
});

io.sockets.on('connection', function (socket) {
    channel.subscribe('tweet', function(message) {
        console.log(message); // => 'bar'
        socket.emit('tweet', message);
    });
    
    channel.subscribe('error', function(message) {
        console.log(message); // => 'bar'
        socket.emit('error', message);
    });
    
    channel.subscribe('end', function(message) {
        console.log(message); // => 'bar'
        socket.emit('end', message);
    });
    
    channel.subscribe('destroy', function(message) {
        console.log(message); // => 'bar'
        socket.emit('destroy', message);
    });
});
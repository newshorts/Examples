
var express = require('express'),
    app = express.createServer(express.logger());
    io = require('socket.io').listen(app),
    events = require('events');
    spider = Object.create(new events.EventEmitter);
    
io.configure(function () { 
    io.set("transports", ["xhr-polling"]); 
    io.set("polling duration", 10);
});

if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    var redis = require("redis"),
        client1 = redis.createClient(rtg.port, rtg.hostname),
        client2 = redis.createClient(rtg.port, rtg.hostname);

    client1.auth(rtg.auth.split(":")[1]);
    client2.auth(rtg.auth.split(":")[1]);
} else {
    var redis = require("redis"),
        client1 = redis.createClient(),
        client2 = redis.createClient();
}

client2.subscribe("tweet");

var lastTweet = '';

/**
 *  Server
 *  
 *  
 * 
 * */

var port = process.env.PORT || 5000;

app.listen(port, function() {
    console.log("Listening on " + port);
});

app.get('/', function(request, response) {
    response.sendfile(__dirname + '/index.html');
});

app.get('/tweet.json', function(request, response) {
    response.json({tweet: lastTweet}); 
});



/**
 *  Socket events
 * */
io.sockets.on('connection', function (socket) {
    
    console.log(socket);
    
    client2.on("message", function(channel, message) {
        console.log("client2 message " + channel + ": " + message);
        lastTweet = message;
        socket.emit('tweet', {tweetText: message});
    });
});
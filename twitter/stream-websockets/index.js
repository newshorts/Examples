var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Twitter = require('twitter');
 
var client = new Twitter({
    consumer_key: 'y6TGuEodblM0ON59GSsruU39M',
    consumer_secret: 'iAB6bjPsk30umjYa1wZPxunyPhNv8bsZGehCIONaSg71lYco2D',
    access_token_key: '189069893-Z3AFN6TXiWPg1h4S3KYlaakLd4dE0X9nVg5RXQLl',
    access_token_secret: 'ygNulmXi8R4aSOfDv95BlA4n7LjqNTBEHTPH0EzlU0ofP'
});

app.set('view engine', 'ejs'); 
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index', { title: 'The index page!' });
});

io.on('connection', function(socket){
    socket.emit('hello');
    socket.on('msg', function(msg){
        console.log('message: ' + msg);
    });
});

client.stream('statuses/filter', {track: 'sunny'}, function(stream) {
    
    console.log(stream)
    
    stream.on('data', function(tweet) {
        console.log(tweet.text);
        io.sockets.emit('tweet', tweet);
    });

    stream.on('error', function(error) {
        throw error;
    });
});

server.listen((process.env.PORT || 5000));

//server.listen(server.get('port'), function() {
//    console.log("Node app is running at localhost:" + server.get('port'));
//});



